"use client";
import { MinimalismContainer, MinimalismCard, MinimalismButton, MinimalismInput } from '@/components/ui';
import { useState } from 'react';
import { AuthGate } from '@/components/auth-gate';
import { useAuth } from '@/contexts/auth-context';

export default function WorkoutTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const res = await fetch('/api/coach/workouts/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-coach-id': user?.id || '' },
        body: JSON.stringify({ name, description, steps: [] }),
      });
      const json = await res.json();
      if (res.ok) {
        setTemplates([json.template, ...templates]);
        setName('');
        setDescription('');
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
        <h1 className="text-2xl font-bold text-gray-900">Workout Templates</h1>
        <p className="mt-2 text-gray-600">Create reusable workout templates for your athletes.</p>
      </div>

      <MinimalismCard>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Template Name</label>
            <MinimalismInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Easy 5K"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <MinimalismInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>
          <MinimalismButton onClick={handleCreate} disabled={loading}>
            {loading ? 'Creating...' : 'Create Template'}
          </MinimalismButton>
        </div>
      </MinimalismCard>

      <div className="mt-6 space-y-4">
        {templates.map((t) => (
          <MinimalismCard key={t.id}>
            <h3 className="font-semibold text-gray-900">{t.name}</h3>
            <p className="text-sm text-gray-600">{t.description || 'No description'}</p>
          </MinimalismCard>
        ))}
      </div>
    </MinimalismContainer>
    </AuthGate>
  );
}