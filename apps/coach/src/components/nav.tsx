import { MinimalismContainer, MinimalismLink } from './ui';

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <MinimalismContainer>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <span className="text-lg font-semibold text-gray-900">RunningRabbit Coach</span>
            <div className="flex space-x-4">
              <MinimalismLink href="/dashboard">Dashboard</MinimalismLink>
              <MinimalismLink href="/roster">Roster</MinimalismLink>
              <MinimalismLink href="/workouts/templates">Templates</MinimalismLink>
              <MinimalismLink href="/feedback">Feedback</MinimalismLink>
              <MinimalismLink href="/invite">Invite</MinimalismLink>
            </div>
          </div>
        </div>
      </MinimalismContainer>
    </nav>
  );
}