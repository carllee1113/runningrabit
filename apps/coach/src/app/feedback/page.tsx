"use client";
import { MinimalismContainer, MinimalismCard, MinimalismButton, MinimalismInput } from '@/components/ui';
import { useState } from 'react';
import { AuthGate } from '@/components/auth-gate';
import { useAuth } from '@/contexts/auth-context';

export default function FeedbackPage() {
  const [athleteId, setAthleteId] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!athleteId || !content) return;
    setLoading(true);
    try {
      const res = await fetch('/api/coach/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-coach-id': user?.id || '' },
        body: JSON.stringify({
          athlete_user_id: athleteId,
          date: new Date().toISOString().slice(0, 10),
          kind: 'text',
          content_text: content,
        }),
      });
      if (res.ok) {
        setContent('');
        alert('Feedback sent!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGate>
    <MinimalismContainer>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Post Feedback</h1>
        <p className="mt-2 text-gray-600">Send feedback to an athlete after their run.</p>
      </div>

      <MinimalismCard>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Athlete ID</label>
            <MinimalismInput
              value={athleteId}
              onChange={(e) => setAthleteId(e.target.value)}
              placeholder="Athlete user ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Great job on today’s run! Keep up the consistency."
            />
          </div>
          <MinimalismButton onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Send Feedback'}
          </MinimalismButton>
        </div>
      </MinimalismCard>
    </MinimalismContainer>
    </AuthGate>
  );
}