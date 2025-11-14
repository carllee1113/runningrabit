"use client";
import { MinimalismContainer, MinimalismCard, MinimalismButton } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { AuthGate } from '@/components/auth-gate';

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <AuthGate>
    <MinimalismContainer>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your athletes and recent activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <MinimalismCard>
          <h2 className="text-lg font-semibold text-gray-900">Athletes</h2>
          <p className="mt-2 text-gray-600">Manage your roster and invite new athletes.</p>
          <MinimalismButton size="sm" className="mt-4" onClick={() => router.push('/roster')}>
            View Roster
          </MinimalismButton>
        </MinimalismCard>

        <MinimalismCard>
          <h2 className="text-lg font-semibold text-gray-900">Workouts</h2>
          <p className="mt-2 text-gray-600">Create templates and assign weekly plans.</p>
          <MinimalismButton size="sm" className="mt-4" onClick={() => router.push('/workouts/templates')}>
            Open Planner
          </MinimalismButton>
        </MinimalismCard>

        <MinimalismCard>
          <h2 className="text-lg font-semibold text-gray-900">Feedback</h2>
          <p className="mt-2 text-gray-600">Post notes or audio after athlete runs.</p>
          <MinimalismButton size="sm" className="mt-4" onClick={() => router.push('/feedback')}>
            Compose Feedback
          </MinimalismButton>
        </MinimalismCard>
      </div>
    </MinimalismContainer>
    </AuthGate>
  );
}