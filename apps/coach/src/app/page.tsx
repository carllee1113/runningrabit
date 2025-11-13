'use client';

import { MinimalismContainer, MinimalismCard, MinimalismButton } from '@/components/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <MinimalismContainer>
      <main className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            RunningRabbit Coach
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with your athletes, plan workouts, and deliver feedback — all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/dashboard">
              <MinimalismButton size="lg">
                Go to Dashboard
              </MinimalismButton>
            </Link>
            <MinimalismButton size="lg" variant="secondary">
              Learn more
            </MinimalismButton>
          </div>
        </div>
      </main>

      <section className="py-12">
        <MinimalismCard>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Sign in with your coach account.</li>
            <li>Invite athletes from the Roster page.</li>
            <li>Create workout templates and assign weekly plans.</li>
            <li>Post feedback after each athlete's run.</li>
          </ol>
        </MinimalismCard>
      </section>
    </MinimalismContainer>
  );
}