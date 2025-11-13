# GitHub Secrets Setup for Vercel Deployment

This guide explains how to set up the required GitHub secrets for automated Vercel deployments.

## Required Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### 1. Vercel Configuration

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID_MAIN=your_main_app_project_id
VERCEL_PROJECT_ID_COACH=your_coach_app_project_id
```

**How to get these values:**

1. **VERCEL_TOKEN**: 
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   - Give it a descriptive name like "GitHub Actions"
   - Copy the token

2. **VERCEL_ORG_ID**:
   - Go to your Vercel team settings
   - The ID is in the URL: `vercel.com/teams/TEAM_NAME/settings`
   - Or use the CLI: `vercel whoami`

3. **VERCEL_PROJECT_ID_MAIN**:
   - Go to your main app project in Vercel
   - Project ID is in the URL: `vercel.com/TEAM_NAME/PROJECT_NAME/settings`
   - Or use the CLI: `vercel projects list`

4. **VERCEL_PROJECT_ID_COACH**:
   - Go to your coach app project in Vercel
   - Project ID is in the URL: `vercel.com/TEAM_NAME/PROJECT_NAME/settings`

### 2. Supabase Configuration

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**How to get these values:**

1. **NEXT_PUBLIC_SUPABASE_URL**:
   - Go to your Supabase project
   - Settings > API
   - Copy the Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   - Same page as above
   - Copy the anon key

3. **SUPABASE_SERVICE_ROLE_KEY**:
   - Same page as above
   - Copy the service role key (keep this secret!)

### 3. Strava Configuration (for main app)

```bash
NEXT_PUBLIC_STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
```

**How to get these values:**

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Create an application if you haven't already
3. Copy the Client ID and Client Secret

## Setting Up Secrets in GitHub

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Go to "Secrets and variables" > "Actions"
4. Click "New repository secret"
5. Add each secret with its corresponding value

## Verification

After setting up all secrets, you can verify the deployment by:

1. Pushing a commit to the `main` branch
2. Going to the "Actions" tab in your GitHub repository
3. Checking if the deployment workflow runs successfully

## Troubleshooting

### Common Issues

1. **Build fails with "Vercel CLI not found"**
   - Make sure `VERCEL_TOKEN` is correctly set
   - Verify the token has proper permissions

2. **Environment variables not found**
   - Double-check the secret names match exactly
   - Ensure all required environment variables are set in Vercel dashboard

3. **Monorepo build issues**
   - Verify the build commands in `vercel.json` files
   - Check that Turbo is properly configured

### Testing Locally

You can test the deployment process locally:

```bash
# Set environment variables
export VERCEL_TOKEN=your_token
export VERCEL_ORG_ID=your_org_id
export VERCEL_PROJECT_ID_MAIN=your_main_project_id
export VERCEL_PROJECT_ID_COACH=your_coach_project_id

# Test coach app deployment
cd apps/coach
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN

# Test main app deployment
cd ../../web
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
```

## Security Best Practices

1. **Never commit secrets to code**
2. **Use different tokens for different environments**
3. **Rotate tokens regularly**
4. **Use the principle of least privilege**
5. **Monitor token usage in Vercel dashboard**

## Next Steps

After setting up GitHub secrets:

1. Push a test commit to trigger deployment
2. Verify both apps deploy successfully
3. Test the functionality on the deployed URLs
4. Set up monitoring and alerts
5. Configure custom domains