# Deployment Guide: RunningRabbit Apps

This guide covers how to set up GitHub integration and deploy both the main RunningRabbit app and the RunningRabbit Coach app to separate Vercel projects.

## GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `runningrabbit` or `runningrabbit-apps`
3. Make it private (recommended for development)
4. Don't initialize with README (we already have one)

### 2. Push Code to GitHub

```bash
# Add the remote repository (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/runningrabbit.git

# Push the code
git push -u origin main
```

## Vercel Deployment Setup

### Strategy: Separate Deployments

We'll deploy two separate apps:
1. **Main App** (user-facing): `runningrabbit.app` or similar
2. **Coach App** (coach-facing): `runningrabbit.coach` or similar

### 1. Main App Deployment

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Name**: `runningrabbit-main` (or your preferred name)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `apps/web` (or wherever your main app is)
   - **Build Command**: `npm run build` (from root, Turbo will handle it)
   - **Output Directory**: `apps/web/.next`

5. Set Environment Variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

6. Deploy

### 2. Coach App Deployment

1. Create another project in Vercel
2. Import the same GitHub repository
3. Configure the project:
   - **Name**: `runningrabbit-coach` (or your preferred name)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `apps/coach`
   - **Build Command**: `npm run build`
   - **Output Directory**: `apps/coach/.next`

4. Set Environment Variables (same as main app):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. Deploy

## Monorepo Configuration

### Root Package.json Scripts

Make sure your root `package.json` has these scripts:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  }
}
```

### Vercel.json for Coach App

Create `apps/coach/vercel.json`:

```json
{
  "buildCommand": "cd ../.. && npm run build --filter=coach",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

### Vercel.json for Main App

Create `apps/web/vercel.json` (if not exists):

```json
{
  "buildCommand": "cd ../.. && npm run build --filter=web",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

## Domain Configuration

### 1. Add Custom Domains

1. In Vercel dashboard, go to each project settings
2. Navigate to "Domains" section
3. Add your domains:
   - Main app: `runningrabbit.app` or `app.runningrabbit.com`
   - Coach app: `runningrabbit.coach` or `coach.runningrabbit.com`

### 2. DNS Configuration

Configure your DNS provider:

```
# For main app
A     app.runningrabbit.com     76.76.19.61
# or CNAME
cname app                       cname.vercel-dns.com

# For coach app
A     coach.runningrabbit.com   76.76.19.61
# or CNAME
cname coach                     cname.vercel-dns.com
```

## Environment Variables Setup

### Required Variables for Both Apps

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App-specific Variables
NEXT_PUBLIC_APP_URL=https://app.runningrabbit.com
NEXT_PUBLIC_COACH_URL=https://coach.runningrabbit.com
```

### Coach App Additional Variables

```bash
# Coach-specific configuration
COACH_ROLE_ID=coach
ATHLETE_ROLE_ID=athlete
```

## Testing Deployment

### Local Testing

```bash
# Test both apps locally
npm run dev

# Test specific app
npm run dev --filter=web
npm run dev --filter=coach
```

### Production Testing

1. Deploy to staging first
2. Test all functionality
3. Check environment variables
4. Verify database connections
5. Test user/coach separation

## Monitoring and Maintenance

### Vercel Analytics
- Enable Vercel Analytics for both projects
- Monitor performance metrics
- Track error rates

### Deployment Strategy
- Use GitHub branches for staging
- Set up branch protection for main
- Use pull requests for code review
- Automated deployments on merge

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Turbo configuration
2. **Environment Variables**: Ensure all required vars are set
3. **Database Connections**: Verify Supabase settings
4. **Domain Issues**: Check DNS propagation
5. **Monorepo Issues**: Verify workspace configuration

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Turbo Repo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Next Steps

After deployment:
1. Set up monitoring and alerts
2. Configure error tracking (Sentry)
3. Set up analytics (Google Analytics, Vercel Analytics)
4. Implement proper authentication
5. Test the complete user/coach workflow
6. Set up CI/CD pipelines for automated testing