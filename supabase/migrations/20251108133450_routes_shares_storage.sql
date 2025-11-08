-- Migration: routes, route_shares, RLS policies, and private GPX storage bucket
-- Date: 2025-11-08
-- Context: Aligns with web/src/services/routes-api.ts and shares-api.ts

-- Extensions
create extension if not exists pgcrypto;

-- Tables
create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 200),
  points_count integer not null check (points_count >= 2),
  geojson jsonb not null,
  gpx_key text,
  created_at timestamptz not null default now()
);

create index if not exists routes_owner_id_idx on public.routes (owner_id);
create index if not exists routes_created_at_idx on public.routes (created_at desc);

alter table public.routes enable row level security;

-- RLS Policies for routes
create policy if not exists "route_owner_select"
  on public.routes for select
  to authenticated
  using (owner_id = auth.uid());

create policy if not exists "route_owner_insert"
  on public.routes for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy if not exists "route_owner_update"
  on public.routes for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy if not exists "route_owner_delete"
  on public.routes for delete
  to authenticated
  using (owner_id = auth.uid());

-- Shared recipients can read via route_shares
create policy if not exists "route_shared_recipient_select"
  on public.routes for select
  to authenticated
  using (exists (
    select 1
    from public.route_shares s
    where s.route_id = routes.id
      and s.revoked = false
      and s.recipient_user_id = auth.uid()
  ));

-- Shares table
create table if not exists public.route_shares (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  recipient_user_id uuid not null references auth.users(id) on delete cascade,
  invite_code text not null default encode(gen_random_bytes(8), 'hex'),
  revoked boolean not null default false,
  created_at timestamptz not null default now(),
  unique (route_id, recipient_user_id)
);

create index if not exists route_shares_owner_id_idx on public.route_shares (owner_id);
create index if not exists route_shares_route_id_idx on public.route_shares (route_id);

alter table public.route_shares enable row level security;

-- RLS Policies for route_shares
create policy if not exists "share_owner_select"
  on public.route_shares for select
  to authenticated
  using (owner_id = auth.uid());

create policy if not exists "share_owner_insert"
  on public.route_shares for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy if not exists "share_owner_delete"
  on public.route_shares for delete
  to authenticated
  using (owner_id = auth.uid());

-- Allow recipients to see their own share rows (for auditing)
create policy if not exists "share_recipient_select"
  on public.route_shares for select
  to authenticated
  using (recipient_user_id = auth.uid());

-- Storage: private GPX bucket
-- Note: Using Supabase storage helper; bucket remains private.
do $$
begin
  if not exists (select 1 from storage.buckets where name = 'gpx') then
    perform storage.create_bucket('gpx', public := false);
  end if;
end $$;

-- Storage RLS on objects (owner-based access)
create policy if not exists "gpx_owner_select"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'gpx' and owner = auth.uid());

create policy if not exists "gpx_owner_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gpx' and owner = auth.uid());

create policy if not exists "gpx_owner_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gpx' and owner = auth.uid())
  with check (bucket_id = 'gpx' and owner = auth.uid());

create policy if not exists "gpx_owner_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gpx' and owner = auth.uid());

-- RPCs for Shares API
-- Create share: only route owner may create; returns inserted share
create or replace function public.create_route_share(p_route_id uuid, p_recipient_user_id uuid)
returns public.route_shares
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_share public.route_shares;
begin
  select owner_id into v_owner from public.routes where id = p_route_id;
  if v_owner is null then
    raise exception 'Route not found';
  end if;
  if v_owner <> auth.uid() then
    raise exception 'Not authorized to share this route';
  end if;

  insert into public.route_shares (route_id, owner_id, recipient_user_id)
  values (p_route_id, v_owner, p_recipient_user_id)
  on conflict (route_id, recipient_user_id) do update set revoked = false
  returning * into v_share;

  return v_share;
end;
$$;

grant execute on function public.create_route_share(uuid, uuid) to authenticated;

-- Revoke share: only owner may revoke; returns updated share
create or replace function public.revoke_route_share(p_share_id uuid)
returns public.route_shares
language plpgsql
security definer
set search_path = public
as $$
declare
  v_share public.route_shares;
begin
  update public.route_shares
    set revoked = true
    where id = p_share_id
      and owner_id = auth.uid()
  returning * into v_share;

  if v_share.id is null then
    raise exception 'Share not found or not authorized';
  end if;

  return v_share;
end;
$$;

grant execute on function public.revoke_route_share(uuid) to authenticated;

-- List shares: owner sees all; recipient sees their own for given route
create or replace function public.list_route_shares(p_route_id uuid)
returns setof public.route_shares
language sql
security definer
set search_path = public
as $$
  select *
  from public.route_shares s
  where s.route_id = p_route_id
    and (
      s.owner_id = auth.uid()
      or s.recipient_user_id = auth.uid()
    );
$$;

grant execute on function public.list_route_shares(uuid) to authenticated;

-- End of migration