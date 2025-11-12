# ✅ Render Deployment Checklist

## Pre-Deployment Checklist

### Code Preparation
- [x] Code is pushed to GitHub
- [x] Repository: `muhammedadil2206/Heimeimage-bot`
- [x] Branch: `main`
- [x] .gitignore excludes .env files
- [x] All dependencies are in package.json
- [x] Build scripts are correct
- [x] Production-ready code

---

## Backend Deployment Checklist

### Step 1: Create Backend Service
- [ ] Go to Render Dashboard
- [ ] Click **New +** → **Web Service**
- [ ] Connect GitHub repository
- [ ] Select repository: `muhammedadil2206/Heimeimage-bot`

### Step 2: Configure Backend
- [ ] **Name:** `heimage-bot-backend`
- [ ] **Environment:** `Node`
- [ ] **Region:** `Oregon`
- [ ] **Branch:** `main`
- [ ] **Root Directory:** `server`
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Instance Type:** `Free`

### Step 3: Set Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...`
- [ ] `JWT_SECRET=your_random_secret_key_32_chars_min`
- [ ] `CLIPDROP_API_KEY=your_clipdrop_api_key`
- [ ] `CLIENT_URL=https://your-frontend-url.onrender.com` (update after frontend deployment)

### Step 4: Advanced Settings
- [ ] **Health Check Path:** `/api/health`
- [ ] **Auto-Deploy:** Enabled
- [ ] **Instance Type:** Free

### Step 5: Deploy Backend
- [ ] Click **Create Web Service**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Note backend URL: `https://heimage-bot-backend.onrender.com`
- [ ] Test health check: `https://heimage-bot-backend.onrender.com/api/health`

---

## Frontend Deployment Checklist

### Step 1: Create Frontend Service
- [ ] Go to Render Dashboard
- [ ] Click **New +** → **Static Site**
- [ ] Connect GitHub repository
- [ ] Select repository: `muhammedadil2206/Heimeimage-bot`

### Step 2: Configure Frontend
- [ ] **Name:** `heimage-bot-frontend`
- [ ] **Branch:** `main`
- [ ] **Root Directory:** `client`
- [ ] **Build Command:** `npm install && npm run build`
- [ ] **Publish Directory:** `dist`

### Step 3: Set Environment Variables
- [ ] `VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api`

### Step 4: Deploy Frontend
- [ ] Click **Create Static Site**
- [ ] Wait for deployment (3-5 minutes)
- [ ] Note frontend URL: `https://heimage-bot-frontend.onrender.com`

---

## Post-Deployment Checklist

### Step 1: Update URLs
- [ ] Update backend `CLIENT_URL` with frontend URL
- [ ] Update frontend `VITE_API_BASE_URL` with backend URL
- [ ] Wait for services to redeploy

### Step 2: Update MongoDB Atlas
- [ ] Go to MongoDB Atlas Dashboard
- [ ] Click **Network Access** → **IP Access List**
- [ ] Add `0.0.0.0/0` (allows all IPs)
- [ ] Click **Confirm**

### Step 3: Verify Deployment
- [ ] Test backend health check
- [ ] Test frontend URL
- [ ] Test signup
- [ ] Test login
- [ ] Test image generation
- [ ] Test history
- [ ] Check MongoDB for saved data

---

## Testing Checklist

### Backend Tests
- [ ] Health check works: `/api/health`
- [ ] MongoDB connection works
- [ ] Signup endpoint works: `/api/auth/signup`
- [ ] Login endpoint works: `/api/auth/login`
- [ ] Image generation works: `/api/image/generate`
- [ ] History endpoint works: `/api/history`

### Frontend Tests
- [ ] Frontend loads correctly
- [ ] Signup page works
- [ ] Login page works
- [ ] Home page loads
- [ ] Image generation works
- [ ] History displays
- [ ] Download works
- [ ] Logout works

### Integration Tests
- [ ] Signup saves to MongoDB
- [ ] Login works with saved user
- [ ] Image generation saves to history
- [ ] History displays saved prompts
- [ ] Download works for generated images

---

## Troubleshooting Checklist

### Backend Issues
- [ ] Check backend logs in Render Dashboard
- [ ] Verify all environment variables are set
- [ ] Check MongoDB connection
- [ ] Verify PORT is set to 10000
- [ ] Check health check endpoint

### Frontend Issues
- [ ] Check frontend logs in Render Dashboard
- [ ] Verify `VITE_API_BASE_URL` is set
- [ ] Check if backend is accessible
- [ ] Verify CORS settings
- [ ] Check browser console for errors

### MongoDB Issues
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Verify MONGO_URI is correct
- [ ] Check user permissions
- [ ] Verify database name is `heimeimage`
- [ ] Check MongoDB Atlas logs

---

## Environment Variables Checklist

### Backend (Render)
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...`
- [ ] `JWT_SECRET=your_random_secret_key_32_chars_min`
- [ ] `CLIPDROP_API_KEY=your_clipdrop_api_key`
- [ ] `CLIENT_URL=https://heimage-bot-frontend.onrender.com`

### Frontend (Render)
- [ ] `VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api`

---

## Quick Reference

### URLs
- **Backend:** `https://heimage-bot-backend.onrender.com`
- **Frontend:** `https://heimage-bot-frontend.onrender.com`
- **API Base:** `https://heimage-bot-backend.onrender.com/api`
- **Health Check:** `https://heimage-bot-backend.onrender.com/api/health`

### GitHub Repository
- **Repository:** https://github.com/muhammedadil2206/Heimeimage-bot.git
- **Branch:** `main`

### MongoDB
- **Database:** `heimeimage`
- **Collection:** `users`
- **IP Whitelist:** `0.0.0.0/0`

---

## 🎉 Deployment Complete!

Once all checkboxes are checked, your Heimage Bot is fully deployed and working on Render! 🚀

---

## 📚 Documentation

- `DEPLOY_TO_RENDER_STEP_BY_STEP.md` - Detailed step-by-step guide
- `RENDER_DEPLOYMENT.md` - Complete deployment guide
- `RENDER_ENV_VARIABLES.md` - Environment variables reference
- `README.md` - Main documentation

---

That's it! Follow this checklist to deploy your Heimage Bot to Render! 🎨🤖

