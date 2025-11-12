# What Happens Automatically vs. Manual Setup

## ✅ What Happens AUTOMATICALLY When You Push to GitHub:

1. **Auto-Deploy** (if enabled in Render):
   - Render detects your push to GitHub
   - Automatically starts building your services
   - Runs the build commands from `render.yaml`
   - Deploys the new version

2. **Host/URL Assignment**:
   - Render automatically assigns URLs:
     - Backend: `https://heimage-bot-backend.onrender.com`
     - Frontend: `https://heimage-bot-frontend.onrender.com`
   - These URLs are **permanent** and don't change

3. **Port Configuration**:
   - Render automatically sets `PORT` environment variable
   - Your code uses `process.env.PORT` (already configured ✅)

## ⚠️ What You MUST Configure MANUALLY (One-Time Setup):

### Step 1: Connect GitHub to Render (First Time Only)
1. Go to Render Dashboard
2. Click "New +" → "Blueprint" (to use render.yaml)
   OR manually create services and connect GitHub repo
3. Enable "Auto-Deploy" in service settings

### Step 2: Set Environment Variables (One-Time, Then They Persist)

**Backend Service - Add these in Render Dashboard:**
- `MONGO_URI` = Your MongoDB connection string
- `JWT_SECRET` = Any random secret string (e.g., generate with: `openssl rand -hex 32`)
- `CLIPDROP_API_KEY` = Your Clipdrop API key
- `CLIENT_URL` = `https://heimage-bot-frontend.onrender.com` (after frontend deploys)

**Frontend Service - Add this in Render Dashboard:**
- `VITE_API_BASE_URL` = `https://heimage-bot-backend.onrender.com/api` (after backend deploys)

### Step 3: Handle URL Dependency (One-Time)

**The Problem:** Frontend needs backend URL, but backend URL is only known after deployment.

**The Solution - Two Options:**

#### Option A: Deploy Backend First (Recommended)
1. Deploy backend service first
2. Copy backend URL: `https://heimage-bot-backend.onrender.com`
3. Deploy frontend service
4. Set `VITE_API_BASE_URL` = `https://heimage-bot-bot-backend.onrender.com/api`
5. Update backend `CLIENT_URL` = `https://heimage-bot-frontend.onrender.com`

#### Option B: Use Render Service References (Advanced)
Update `render.yaml` to use Render's service reference feature (see below)

## 🔄 After Initial Setup - What Happens on Each Push:

Once everything is configured:
1. You push code to GitHub ✅
2. Render auto-detects the push ✅
3. Render builds and deploys automatically ✅
4. **Environment variables persist** - you don't need to set them again ✅
5. **URLs stay the same** - they never change ✅

## 📝 Quick Setup Checklist:

- [ ] Push code to GitHub
- [ ] Connect repo to Render (first time)
- [ ] Deploy backend service
- [ ] Copy backend URL
- [ ] Deploy frontend service  
- [ ] Set `VITE_API_BASE_URL` in frontend = `https://YOUR-BACKEND.onrender.com/api`
- [ ] Set `CLIENT_URL` in backend = `https://YOUR-FRONTEND.onrender.com`
- [ ] Set other env vars (MONGO_URI, JWT_SECRET, CLIPDROP_API_KEY)
- [ ] Enable auto-deploy for both services
- [ ] ✅ Done! Future pushes will auto-deploy

## 💡 Pro Tip:

After first deployment, you can update `render.yaml` with the actual URLs, but it's not necessary - the environment variables in Render Dashboard will override the YAML values anyway.

