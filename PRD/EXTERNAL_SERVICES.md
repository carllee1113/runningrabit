# External Services Inventory

This document lists all external services currently used by the MVP and optional/planned ones. It helps with compliance (attribution, terms), environment variables, and deployment readiness.

## Currently Used

- Basemap tiles
  - Source: `NEXT_PUBLIC_HK_TILE_URL` if set (Hong Kong Open Data tile service), else fallback to `https://tile.openstreetmap.org/{z}/{x}/{y}.png`.
  - Attribution: `© OpenStreetMap contributors | HK Open Data (configurable)` is displayed in the map.
  - Notes:
    - Ensure proper attribution is visible in the UI.
    - Respect provider rate limits. For production, consider your own tile hosting or a commercial provider.
    - CORS: Tile server must allow cross-origin requests for web clients.
    - Configure via `NEXT_PUBLIC_HK_TILE_URL` (no secrets; public-only).

- Mapping library (client)
  - Library: `maplibre-gl` (npm package).
  - Not a networked service; renders raster tiles provided by configured sources.

- GPX parsing (client)
  - Library: `@tmcw/togeojson` (npm package).
  - No external API calls; parses user-provided GPX locally in-browser.

## Not Used (MVP)

- Backend API: none
- Database: none
- Authentication: none
- File/object storage: none

## Optional/Configurable (Environment)

- `NEXT_PUBLIC_HK_TILE_URL`
  - Description: Public basemap tile URL for Hong Kong Open Data.
  - Example pattern: `https://example.hk.gov/tiles/{z}/{x}/{y}.png`
  - Scope: Public only; do not include secrets in `NEXT_PUBLIC_*` variables.

## Planned (Post-MVP)

- Supabase (Database + Auth + Storage)
  - Purpose: Persist routes, manage private shares, enforce RLS.
  - Status: Not integrated yet. When approved, we will add:
    - Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (frontend), and service role keys only in server-side contexts.
    - RLS policies for per-user access to routes and shares.
    - Tests for unauthorized access and edge cases.

## Compliance & Security Checklist

- Do not hardcode secrets in the frontend; only use `NEXT_PUBLIC_*` for non-sensitive values.
- Ensure map attribution is present and legible on all screens that render tiles.
- Validate/limit file uploads to `.gpx` and parse client-side safely.
- If adding new services, audit license/terms and document the provider, URL, usage constraints, and required attribution here.