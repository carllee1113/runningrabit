"use client";
import { MinimalismContainer, MinimalismCard } from '@/components/ui';
import { useEffect, useState } from 'react';
import { AuthGate } from '@/components/auth-gate';
import { useAuth } from '@/contexts/auth-context';

interface Athlete {
  link_id: string;
  athlete_id: string;
  status: string;
  display_name: string;
  created_at: string;
}

export default function RosterPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch('/api/coach/athletes', { headers: { 'x-coach-id': user?.id || '' } })
      .then((res) => res.json())
      .then((json) => {
        setAthletes(json.athletes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AuthGate>
    <MinimalismContainer>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Athlete Roster</h1>
        <p className="mt-2 text-gray-600">Manage your connected athletes.</p>
      </div>

      <MinimalismCard>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : athletes.length === 0 ? (
          <p className="text-gray-600">No athletes connected yet. Invite one to get started.</p>
        ) : (
          <ul className="divide-y">
            {athletes.map((a) => (
              <li key={a.link_id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{a.display_name}</p>
                  <p className="text-sm text-gray-600">Status: {a.status}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    a.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : a.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </MinimalismCard>
    </MinimalismContainer>
    </AuthGate>
  );
}