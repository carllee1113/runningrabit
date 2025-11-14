'use client';

import { MinimalismButton } from '@/components/ui';
import { LogIn } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      title: 'Roster Management',
      description: 'Invite athletes, manage links, and keep your roster organized.'
    },
    {
      title: 'Workout Templates',
      description: 'Build reusable training templates tailored to athlete goals.'
    },
    {
      title: 'Weekly Planner',
      description: 'Assign templates to athletes and plan weeks with clarity.'
    },
    {
      title: 'Feedback Composer',
      description: 'Post text or audio feedback after each athlete run.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" role="banner">
        <div className="text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">RunningRabbit Coach</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Plan training, invite athletes, assign weekly workouts, and deliver timely feedback. Works side‑by‑side with the athlete app to keep everyone in sync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MinimalismButton size="lg" onClick={() => (window.location.href = '/dashboard')}>Go to Dashboard</MinimalismButton>
            <MinimalismButton size="lg" variant="secondary" onClick={() => (window.location.href = '/invite')}>Invite Athletes</MinimalismButton>
          </div>
          <div className="mt-6">
            <MinimalismButton
              size="md"
              className="inline-flex items-center gap-2"
              onClick={() => (window.location.href = '/dashboard')}
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </MinimalismButton>
          </div>
        </div>
      </header>

      <main id="main-content" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" role="main">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">How it works</h2>
            <ol className="mt-3 space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="font-medium">1.</span> Invite athletes and link their accounts to your roster.</li>
              <li className="flex gap-2"><span className="font-medium">2.</span> Create workout templates and assign weekly plans from the planner.</li>
              <li className="flex gap-2"><span className="font-medium">3.</span> Athletes complete workouts in the athlete app; sessions sync to your dashboard.</li>
              <li className="flex gap-2"><span className="font-medium">4.</span> Post notes or audio feedback to close the loop and adjust next week.</li>
            </ol>
            <div className="mt-6 flex gap-3">
              <MinimalismButton size="md" onClick={() => (window.location.href = '/workouts/templates')}>Create Templates</MinimalismButton>
              <MinimalismButton size="md" variant="secondary" onClick={() => (window.location.href = '/roster')}>View Roster</MinimalismButton>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Coach & Athlete roles</h2>
            <div className="mt-3 grid grid-cols-1 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-900">Coach</h3>
                <p className="mt-2 text-gray-700">Plans training, assigns workouts, reviews synced sessions, and provides feedback.</p>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-900">Athlete</h3>
                <p className="mt-2 text-gray-700">Completes assigned workouts in the athlete app; progress and notes sync back to the coach.</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Both apps share the same Supabase backend with role‑based access, keeping data secure and synchronized.</p>
          </div>
        </section>

        <section className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Start coaching with clarity</h2>
          <p className="mt-3 text-gray-700">Set up your roster, assign plans, and keep feedback flowing every week.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <MinimalismButton size="lg" onClick={() => (window.location.href = '/dashboard')}>Open Dashboard</MinimalismButton>
            <MinimalismButton size="lg" variant="secondary" onClick={() => (window.location.href = '/invite')}>Send Invitations</MinimalismButton>
          </div>
        </section>
      </main>
    </div>
  );
}