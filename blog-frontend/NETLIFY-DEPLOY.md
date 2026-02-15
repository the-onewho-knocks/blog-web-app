# 🚀 Netlify Deployment Guide for Blogverse

## Backend URL Configuration
Your Railway backend: `https://blog-web-app-production-6076.up.railway.app/api`

## 📋 Pre-Deployment Checklist

### 1. Backend CORS Configuration
Make sure your Railway backend allows requests from Netlify. Update your backend `server.js`:

```javascript
const cors = require("cors");

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app-name.netlify.app',  // Add your Netlify URL here
    'https://*.netlify.app'  // Or allow all Netlify domains
  ],
  credentials: true
}));
```

### 2. Verify Backend Endpoints
Test that your backend is accessible:
```bash
curl https://blog-web-app-production-6076.up.railway.app/api/blogs
```

## 🌐 Method 1: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Navigate to Frontend Directory
```bash
cd blog-frontend
```

### Step 4: Build the Project
```bash
npm install
npm run build
```

### Step 5: Deploy to Netlify
```bash
# Deploy for testing
netlify deploy

# When ready, deploy to production
netlify deploy --prod
```

Follow the prompts:
- **Create & configure a new site**: Yes
- **Team**: Select your team
- **Site name**: Choose a name (e.g., `blogverse-app`)
- **Publish directory**: `dist`

### Step 6: Set Environment Variables (Important!)
```bash
netlify env:set VITE_API_URL https://blog-web-app-production-6076.up.railway.app/api
```

Or set it in Netlify Dashboard:
1. Go to Site settings
2. Build & deploy → Environment
3. Add variable:
   - Key: `VITE_API_URL`
   - Value: `https://blog-web-app-production-6076.up.railway.app/api`

## 🌐 Method 2: Deploy via Netlify Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Deploy Blogverse to Netlify"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/blogverse-frontend.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** (authorize if needed)
4. Select your repository: `blogverse-frontend`

### Step 3: Configure Build Settings

**Build settings:**
- **Base directory**: (leave empty or `blog-frontend` if in subdirectory)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### Step 4: Add Environment Variables

Click **"Show advanced"** → **"New variable"**

Add:
- **Key**: `VITE_API_URL`
- **Value**: `https://blog-web-app-production-6076.up.railway.app/api`

### Step 5: Deploy!

Click **"Deploy site"**

Netlify will:
1. Install dependencies
2. Build your project
3. Deploy to a live URL

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS

Once you get your Netlify URL (e.g., `https://blogverse-app.netlify.app`), update your backend CORS:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://blogverse-app.netlify.app'  // Your actual Netlify URL
  ],
  credentials: true
}));
```

Redeploy your Railway backend after this change.

### 2. Custom Domain (Optional)

In Netlify Dashboard:
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow instructions to configure DNS

### 3. Enable HTTPS (Automatic)

Netlify automatically provisions SSL certificates. Your site will be available at:
- `https://your-site-name.netlify.app`

## 🧪 Testing Deployment

### Test These Features:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] User registration
- [ ] User login
- [ ] View all blogs
- [ ] Create new blog
- [ ] Upload images/videos
- [ ] Edit blog
- [ ] Delete blog
- [ ] Search functionality
- [ ] Share functionality

### Debug Issues:

**1. API calls failing (CORS errors)**
```
Solution: Update backend CORS to include your Netlify URL
```

**2. Environment variable not working**
```bash
# Verify in Netlify Dashboard
Site settings → Environment variables

# Rebuild after adding variables
Deploys → Trigger deploy → Clear cache and deploy site
```

**3. 404 on refresh**
```
Solution: netlify.toml is configured with redirects, should work
If not, check "Redirects and rewrites" in Netlify settings
```

**4. Build fails**
```bash
# Check build logs in Netlify Dashboard
# Common issues:
- Missing dependencies → npm install
- Wrong Node version → Set to 18
- Build command wrong → Should be "npm run build"
```

## 📱 Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run build checks

### Deploy Preview for Branches:
```bash
# Create new branch
git checkout -b feature/new-feature

# Make changes and push
git push origin feature/new-feature

# Netlify creates preview URL automatically
```

## 🔄 Update Deployment

### Option 1: Via Git
```bash
# Make changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# Netlify auto-deploys
```

### Option 2: Via Netlify CLI
```bash
npm run build
netlify deploy --prod
```

## 🎯 Environment-Specific Builds

### Local Development (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (Netlify Environment Variables)
```env
VITE_API_URL=https://blog-web-app-production-6076.up.railway.app/api
```

The app automatically uses the right URL based on environment!

## 📊 Monitoring & Analytics

### Enable Netlify Analytics:
1. Go to Site settings
2. Analytics
3. Enable Netlify Analytics ($9/month)

Or use free alternatives:
- Google Analytics
- Plausible
- Umami

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Set `VITE_API_URL` in Netlify Dashboard
- ✅ Never commit `.env` to Git

### 2. Headers (already configured in netlify.toml)
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options

### 3. HTTPS
- ✅ Automatically enabled by Netlify
- ✅ Redirects HTTP to HTTPS

## 🚨 Troubleshooting

### Error: "Failed to fetch"
**Cause**: Backend not accessible or CORS issue

**Solution**:
1. Check backend is running: Visit `https://blog-web-app-production-6076.up.railway.app/api/blogs`
2. Update backend CORS to include Netlify URL
3. Verify `VITE_API_URL` is set correctly in Netlify

### Error: "404 Not Found" on refresh
**Cause**: SPA routing issue

**Solution**: Ensure `netlify.toml` exists with redirect rules (already included)

### Error: "Environment variable not defined"
**Cause**: Build process can't find `VITE_API_URL`

**Solution**:
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add `VITE_API_URL` = `https://blog-web-app-production-6076.up.railway.app/api`
3. Trigger new deploy: Deploys → Trigger deploy → Clear cache and deploy

### Build Errors
**Check**:
- Node version is 18+
- All dependencies in package.json
- Build command is correct: `npm run build`
- Output directory is: `dist`

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Community**: https://answers.netlify.com/
- **Status Page**: https://www.netlifystatus.com/

## ✅ Final Checklist

Before going live:
- [ ] Backend CORS configured for Netlify URL
- [ ] Environment variables set in Netlify
- [ ] Build successful
- [ ] All features tested on live site
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS working
- [ ] Analytics setup (optional)

## 🎉 You're Live!

Your Blogverse app is now live at:
```
https://your-site-name.netlify.app
```

Share it with the world! 🚀✨

---

**Need Help?**
- Check Netlify build logs
- Verify backend Railway logs
- Test API endpoints with Postman
- Check browser console for errors
