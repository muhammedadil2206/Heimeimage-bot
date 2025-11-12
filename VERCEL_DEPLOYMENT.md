# 🚀 Deploy to Vercel - Complete Guide

## Overview

Vercel is a serverless platform that's perfect for frontend deployment and can also host your backend using serverless functions. This guide will help you deploy both frontend and backend to Vercel.

---

## 🎯 Deployment Strategy

### Option 1: Both Frontend and Backend on Vercel (Recommended)
- **Frontend:** Vercel (Static Site)
- **Backend:** Vercel (Serverless Functions)

### Option 2: Frontend on Vercel + Backend on Render
- **Frontend:** Vercel (Static Site)
- **Backend:** Render (Web Service)

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Code pushed to GitHub
3. **MongoDB Atlas** - Database already set up
4. **Clipdrop API Key** - Already have the key

---

## 🚀 Step 1: Deploy Backend to Vercel

### 1.1: Prepare Backend for Vercel

The backend needs to be restructured for Vercel's serverless function model. I've created `server/vercel.js` which wraps the Express app for Vercel.

### 1.2: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository: `muhammedadil2206/Heimeimage-bot`
4. Select the repository

### 1.3: Configure Backend

**Framework Preset:** `Other`  
**Root Directory:** `server`  
**Build Command:** `npm install`  
**Output Directory:** Leave empty  
**Install Command:** `npm install`

### 1.4: Set Environment Variables

Click **Environment Variables** and add:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_32_chars_min
CLIPDROP_API_KEY=a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important:**
- Replace `<YOUR_PASSWORD>` with your MongoDB password
- Replace `your_random_secret_key_32_chars_min` with a strong random string
- Replace `your-frontend-url.vercel.app` with your actual frontend URL (update after deploying frontend)

### 1.5: Configure vercel.json

The `vercel.json` file routes all `/api/*` requests to the serverless function.

### 1.6: Deploy Backend

1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. **Note your backend URL:** `https://your-project.vercel.app`
4. **Test backend:** `https://your-project.vercel.app/api/health`
5. Should return: `{"status":"ok","timestamp":"..."}`

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1: Create New Vercel Project for Frontend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import the same GitHub repository: `muhammedadil2206/Heimeimage-bot`
4. Select the repository

### 2.2: Configure Frontend

**Framework Preset:** `Vite`  
**Root Directory:** `client`  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

### 2.3: Set Environment Variables

Click **Environment Variables** and add:

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

**Important:**
- Replace `your-backend-url.vercel.app` with your actual backend URL
- Include `/api` at the end
- Use HTTPS (not HTTP)

### 2.4: Deploy Frontend

1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. **Note your frontend URL:** `https://your-frontend.vercel.app`

---

## 🔧 Step 3: Update URLs

### 3.1: Update Backend CLIENT_URL

1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Update `CLIENT_URL` to your frontend URL:
   ```
   https://your-frontend.vercel.app
   ```
3. Click **Save**
4. Redeploy backend (Vercel will automatically redeploy)

### 3.2: Update Frontend VITE_API_BASE_URL

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Update `VITE_API_BASE_URL` to your backend URL:
   ```
   https://your-backend-url.vercel.app/api
   ```
3. Click **Save**
4. Redeploy frontend (Vercel will automatically redeploy)

### 3.3: Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas → Network Access → IP Access List
2. Add `0.0.0.0/0` (allows all IPs)
3. Click **Confirm**

**Note:** Vercel uses dynamic IPs, so `0.0.0.0/0` is necessary.

---

## ✅ Step 4: Verify Deployment

### 4.1: Test Backend

1. **Health Check:**
   ```
   GET https://your-backend-url.vercel.app/api/health
   ```
   **Expected:** `{"status":"ok","timestamp":"..."}`

2. **Test Signup:**
   ```
   POST https://your-backend-url.vercel.app/api/auth/signup
   Content-Type: application/json
   
   {
     "name": "Test",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

### 4.2: Test Frontend

1. Go to your frontend URL: `https://your-frontend.vercel.app`
2. Try to sign up
3. Try to login
4. Try to generate an image

### 4.3: Check Logs

1. Go to Vercel Dashboard → Your Project → Logs
2. Check for errors
3. Look for successful requests

---

## 🔧 Step 5: Update vercel.json

The `vercel.json` file should be in the root directory and configure routing:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/vercel.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/vercel.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 📝 Important Notes

### MongoDB Connection for Serverless

Vercel uses serverless functions, which means:
- Functions are stateless
- Connections should be reused when possible
- MongoDB connection pooling is important

The `server/vercel.js` file includes connection optimization for serverless:
- Reuses existing connections
- Connects on first request
- Maintains connection pool

### Cold Starts

- First request might be slower (cold start)
- Subsequent requests are faster (warm function)
- Consider using Vercel Pro for better performance

### Environment Variables

- Set in Vercel Dashboard → Settings → Environment Variables
- Available in all environments (Production, Preview, Development)
- Can be different for each environment

### Function Timeout

- Free tier: 10 seconds
- Pro tier: 60 seconds
- Image generation might take longer - consider upgrading

---

## 🚨 Troubleshooting

### Issue: Backend Returns 404

**Solution:**
1. Check `vercel.json` configuration
2. Verify routes are correct
3. Check function logs in Vercel Dashboard
4. Verify `server/vercel.js` exists and is correct

### Issue: MongoDB Connection Failed

**Solution:**
1. Check `MONGO_URI` is set correctly
2. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Check connection pooling in `server/vercel.js`
4. Check Vercel function logs

### Issue: CORS Error

**Solution:**
1. Check `CLIENT_URL` is set correctly in backend
2. Verify frontend URL matches `CLIENT_URL`
3. Check CORS configuration in `server/vercel.js`
4. Verify both URLs use HTTPS

### Issue: Function Timeout

**Solution:**
1. Image generation might take longer than 10 seconds
2. Consider upgrading to Vercel Pro (60 seconds)
3. Optimize image generation process
4. Use async processing if possible

### Issue: Environment Variables Not Working

**Solution:**
1. Check variables are set in Vercel Dashboard
2. Verify variable names are correct
3. Redeploy after adding variables
4. Check function logs for errors

---

## 📊 Comparison: Vercel vs Render

### Vercel Advantages:
- ✅ Excellent for frontend deployment
- ✅ Automatic HTTPS and CDN
- ✅ Easy deployment from GitHub
- ✅ Great developer experience
- ✅ Serverless functions (pay per use)

### Vercel Disadvantages:
- ❌ Serverless functions have cold starts
- ❌ Function timeout limits (10s free, 60s pro)
- ❌ More complex for long-running processes
- ❌ MongoDB connection needs optimization

### Render Advantages:
- ✅ Better for long-running servers
- ✅ No function timeout limits
- ✅ Easier for traditional Express apps
- ✅ Better for image generation (longer processes)

### Render Disadvantages:
- ❌ Slower deployment
- ❌ Less optimized for frontend
- ❌ Requires more configuration

---

## 🎯 Recommendation

### For This Project:

**Option 1: Frontend on Vercel + Backend on Render (Recommended)**
- Frontend: Vercel (better performance, CDN)
- Backend: Render (better for long-running processes, image generation)

**Option 2: Both on Vercel**
- Frontend: Vercel
- Backend: Vercel (requires Pro plan for longer timeouts)

---

## ✅ Deployment Checklist

### Backend (Vercel)
- [ ] Backend code prepared for serverless
- [ ] `vercel.json` configured
- [ ] `server/vercel.js` created
- [ ] Environment variables set
- [ ] MongoDB connection optimized
- [ ] Backend deployed and accessible
- [ ] Health check works

### Frontend (Vercel)
- [ ] Frontend code ready
- [ ] Environment variables set
- [ ] Build command configured
- [ ] Output directory set to `dist`
- [ ] Frontend deployed and accessible
- [ ] API calls work

### After Deployment
- [ ] Backend `CLIENT_URL` updated
- [ ] Frontend `VITE_API_BASE_URL` updated
- [ ] MongoDB IP whitelist updated
- [ ] Health check works
- [ ] Signup works
- [ ] Login works
- [ ] Image generation works

---

## 🚀 Quick Start

### 1. Deploy Backend

1. Go to Vercel Dashboard → New Project
2. Import GitHub repository
3. Configure:
   - Root Directory: `server`
   - Framework: Other
   - Build Command: `npm install`
4. Set environment variables
5. Deploy

### 2. Deploy Frontend

1. Go to Vercel Dashboard → New Project
2. Import GitHub repository
3. Configure:
   - Root Directory: `client`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variables
5. Deploy

### 3. Update URLs

1. Update backend `CLIENT_URL`
2. Update frontend `VITE_API_BASE_URL`
3. Update MongoDB IP whitelist

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [MongoDB Atlas IP Whitelist](https://docs.atlas.mongodb.com/security/ip-access-list/)

---

That's it! Your Heimage Bot is now deployed to Vercel! 🎉

