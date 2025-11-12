# 🚀 Deploy to Netlify - Complete Guide

## ✅ Netlify Settings (Fill These In)

### Build & Deploy Settings:

**Branch to deploy:** `main`  
**Base directory:** `client`  
**Build command:** `npm install && npm run build`  
**Publish directory:** `dist`  
**Functions directory:** (leave empty - don't fill)

---

## 🎯 Deployment Strategy

### Recommended Setup:

- **Frontend:** Netlify (Static Site) ✅
- **Backend:** Vercel or Render (Server) ✅

### Why?

- Netlify is **perfect** for frontend (React static sites)
- Netlify Functions have **timeout limits** (10s free, 26s pro)
- Image generation might take **longer than 10 seconds**
- Vercel/Render is **better** for backend (no timeout limits)

---

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend First (Vercel or Render)

**You need to deploy backend FIRST before deploying frontend to Netlify!**

#### Option A: Deploy Backend to Vercel (Recommended)

1. **Go to:** https://vercel.com/dashboard
2. **Click:** "Add New..." → "Project"
3. **Connect GitHub:** `muhammedadil2206/Heimeimage-bot`
4. **Configure:**
   - **Root Directory:** `.` (root)
   - **Build Command:** `cd server && npm install`
   - **Output Directory:** EMPTY (leave empty)
   - **Framework Preset:** Other
5. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
   JWT_SECRET=your_random_secret_key_32_chars_min
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLIENT_URL=https://your-frontend-url.netlify.app
   ```
6. **Deploy** and wait 2-3 minutes
7. **Copy:** Your backend URL (e.g., `https://heimage-bot-backend.vercel.app`)

#### Option B: Deploy Backend to Render

1. **Go to:** https://dashboard.render.com
2. **Click:** "New +" → "Web Service"
3. **Connect GitHub:** `muhammedadil2206/Heimeimage-bot`
4. **Configure:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Environment Variables:** (same as above)
6. **Deploy** and wait 5-10 minutes
7. **Copy:** Your backend URL (e.g., `https://heimage-bot-backend.onrender.com`)

---

### Step 2: Deploy Frontend to Netlify

1. **Go to:** https://app.netlify.com
2. **Click:** "Add new site" → "Import an existing project"
3. **Connect GitHub:**
   - Click "GitHub"
   - Authorize Netlify
   - Select repository: `muhammedadil2206/Heimeimage-bot`

4. **Configure Build Settings:**
   - **Branch to deploy:** `main`
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** Leave empty (don't fill)

5. **Environment Variables:**
   - Click "Advanced" → "New variable"
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend-url.vercel.app/api`
   - **Important:** Replace `your-backend-url.vercel.app` with your actual backend URL from Step 1

6. **Click:** "Deploy site"
7. **Wait:** 2-3 minutes
8. **Copy:** Your frontend URL (e.g., `https://heimage-bot-frontend.netlify.app`)

---

### Step 3: Update URLs

1. **Update Backend CLIENT_URL:**
   - Go to Vercel/Render Dashboard → Backend Project → Settings → Environment Variables
   - Update `CLIENT_URL` to your Netlify frontend URL
   - Example: `https://heimage-bot-frontend.netlify.app`
   - Save and redeploy

2. **Update MongoDB Atlas:**
   - Go to MongoDB Atlas → Network Access → IP Access List
   - Add `0.0.0.0/0` (allows all IPs)
   - Click "Confirm"

---

### Step 4: Test Deployment

1. **Go to:** Your Netlify frontend URL
2. **Test:** Sign up
3. **Test:** Login
4. **Test:** Image generation

---

## 🔧 Detailed Netlify Settings

### Branch to deploy: `main`
- **What it means:** Deploy from `main` branch
- **Why:** Your code is on `main` branch
- **What to fill:** `main`

### Base directory: `client`
- **What it means:** Where your frontend code is located
- **Why:** Your React app is in `client` folder
- **What to fill:** `client`

### Build command: `npm install && npm run build`
- **What it means:** Install dependencies and build the app
- **Why:** Need to install packages and build React app
- **What to fill:** `npm install && npm run build`

### Publish directory: `dist`
- **What it means:** Where built files are located
- **Why:** Vite builds to `dist` folder
- **What to fill:** `dist`

### Functions directory: Leave empty
- **What it means:** Where Netlify Functions are located
- **Why:** You're not using Netlify Functions (backend is on Vercel/Render)
- **What to fill:** Leave empty (don't set)

---

## 📝 Complete Netlify Settings Summary

### Build & Deploy Settings:

```
Branch to deploy: main
Base directory: client
Build command: npm install && npm run build
Publish directory: dist
Functions directory: (leave empty)
```

### Environment Variables:

```
VITE_API_BASE_URL = https://your-backend-url.vercel.app/api
```

**Important:** Replace `your-backend-url.vercel.app` with your actual backend URL!

---

## ✅ Quick Checklist

### Backend (Deploy First):
- [ ] Backend deployed to Vercel or Render
- [ ] Backend URL copied (e.g., `https://heimage-bot-backend.vercel.app`)
- [ ] Environment variables set
- [ ] Backend health check works: `/api/health`

### Frontend (Netlify):
- [ ] Branch to deploy: `main`
- [ ] Base directory: `client`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: Empty
- [ ] Environment variable: `VITE_API_BASE_URL` set to backend URL
- [ ] Frontend deployed and accessible

### After Deployment:
- [ ] Backend `CLIENT_URL` updated to Netlify frontend URL
- [ ] MongoDB IP whitelist updated to `0.0.0.0/0`
- [ ] Frontend URL works
- [ ] Backend URL works
- [ ] Signup works
- [ ] Login works
- [ ] Image generation works

---

## 🚨 Important Notes

### Backend Must Be Deployed First!

1. **Deploy backend to Vercel or Render FIRST**
2. **Get backend URL**
3. **Then deploy frontend to Netlify**
4. **Set `VITE_API_BASE_URL` to your backend URL**

### Why Not Netlify for Backend?

- ❌ Netlify Functions have timeout limits (10s free, 26s pro)
- ❌ Image generation might take longer than 10 seconds
- ✅ Vercel/Render is better for backend (no timeout limits)

### Recommended Setup:

- **Frontend:** Netlify (Static Site) ✅
- **Backend:** Vercel or Render (Server) ✅

---

## 🎯 Summary

### Netlify Settings (Fill These In):

**Branch to deploy:** `main`  
**Base directory:** `client`  
**Build command:** `npm install && npm run build`  
**Publish directory:** `dist`  
**Functions directory:** (leave empty)

### Environment Variable:

```
VITE_API_BASE_URL = https://your-backend-url.vercel.app/api
```

### Deployment Order:

1. **Deploy backend to Vercel/Render FIRST**
2. **Get backend URL**
3. **Deploy frontend to Netlify**
4. **Update backend CLIENT_URL**
5. **Test deployment**

---

## 📚 Additional Resources

- **Netlify Quick Start:** `NETLIFY_QUICK_START.md`
- **Vercel Deployment:** `VERCEL_QUICK_START.md`
- **Render Deployment:** `DEPLOY_TO_RENDER_STEP_BY_STEP.md`

---

That's it! Deploy backend first, then deploy frontend to Netlify! 🚀

Need help with any step? Just ask! 😊

