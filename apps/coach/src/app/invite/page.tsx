"use client";
import { MinimalismContainer, MinimalismCard, MinimalismButton, MinimalismInput } from '@/components/ui';
import { useState } from 'react';
import { AuthGate } from '@/components/auth-gate';
import { useAuth } from '@/contexts/auth-context';

export default function InviteAthletePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleInvite = async () => {
    if (!email) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/coach/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-coach-id': user?.id || '' },
        body: JSON.stringify({ athlete_email: email }),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage('Invitation sent!');
        setEmail('');
      } else {
        setMessage(json.error || 'Failed to send invitation');
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGate>
    <MinimalismContainer>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Invite Athlete</h1>
        <p className="mt-2 text-gray-600">Send an invitation to connect with an athlete.</p>
      </div>

      <MinimalismCard>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Athlete Email
            </label>
            <MinimalismInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@example.com"
            />
          </div>
          <MinimalismButton onClick={handleInvite} disabled={loading}>
            {loading ? 'Sending...' : 'Send Invitation'}
          </MinimalismButton>
          {message && <p className="text-sm text-gray-700">{message}</p>}
        </div>
      </MinimalismCard>
    </MinimalismContainer>
    </AuthGate>
  );
}