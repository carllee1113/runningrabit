# RunningRabbit Coach

Coach dashboard for RunningRabbit athletes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Features

- Coach authentication
- Athlete invitation system
- Workout template management
- Weekly assignment planning
- Post-run feedback composer

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Shared UI components