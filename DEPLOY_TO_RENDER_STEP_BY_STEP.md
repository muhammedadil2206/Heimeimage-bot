# 🚀 Deploy to Render - Step by Step Guide

## ✅ Code is Now on GitHub!

**Repository:** https://github.com/muhammedadil2206/Heimeimage-bot.git
**Branch:** `main`

---

## 📋 Deployment Steps

### Step 1: Deploy Backend to Render

#### 1.1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Click **Connect account** (if not already connected)
4. Select **GitHub** and authorize Render
5. Find and select repository: `muhammedadil2206/Heimeimage-bot`

#### 1.2: Configure Backend Service

**Basic Settings:**
- **Name:** `heimage-bot-backend`
- **Environment:** `Node`
- **Region:** `Oregon` (or closest to you)
- **Branch:** `main`
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

**Environment Variables:**
Click **Add Environment Variable** and add these:

```
NODE_ENV = production
PORT = 10000
MONGO_URI = mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
JWT_SECRET = your_random_secret_key_minimum_32_characters
CLIPDROP_API_KEY = a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
CLIENT_URL = https://your-frontend-url.onrender.com
```

**Important:**
- Replace `<YOUR_PASSWORD>` with your actual MongoDB password
- Replace `your_random_secret_key_minimum_32_characters` with a strong random string (32+ characters)
- Replace `your-frontend-url.onrender.com` with your actual frontend URL (you'll update this after deploying frontend)
- **No quotes** around values
- **No spaces** around `=` sign

#### 1.3: Advanced Settings

**Health Check:**
- **Health Check Path:** `/api/health`

**Auto-Deploy:**
- ✅ Enable **Auto-Deploy** (deploys on every push to main)

**Scaling:**
- **Instance Type:** Free (or upgrade for better performance)

#### 1.4: Deploy Backend

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. **Note your backend URL:** `https://heimage-bot-backend.onrender.com`
4. **Test backend:** `https://heimage-bot-backend.onrender.com/api/health`

---

### Step 2: Deploy Frontend to Render

#### 2.1: Create New Static Site

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Static Site**
3. Connect your GitHub repository (if not already connected)
4. Select repository: `muhammedadil2206/Heimeimage-bot`

#### 2.2: Configure Frontend Service

**Basic Settings:**
- **Name:** `heimage-bot-frontend`
- **Branch:** `main`
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist` (Vite outputs build files to this directory)

**Environment Variables:**
Click **Add Environment Variable** and add:

```
VITE_API_BASE_URL = https://heimage-bot-backend.onrender.com/api
```

**Important:**
- Replace `heimage-bot-backend.onrender.com` with your actual backend URL
- Include `/api` at the end
- Use HTTPS (not HTTP)

#### 2.3: Deploy Frontend

1. Click **Create Static Site**
2. Wait for deployment (3-5 minutes)
3. **Note your frontend URL:** `https://heimage-bot-frontend.onrender.com`

---

### Step 3: Update Environment Variables

#### 3.1: Update Backend CLIENT_URL

1. Go to Render Dashboard
2. Click on your backend service (`heimage-bot-backend`)
3. Go to **Environment** tab
4. Find `CLIENT_URL` variable
5. Update value to: `https://heimage-bot-frontend.onrender.com`
6. Click **Save Changes**
7. Service will automatically redeploy

#### 3.2: Update MongoDB Atlas IP Whitelist

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. Add `0.0.0.0/0` (allows all IPs)
5. Click **Confirm**

**Note:** This allows Render servers to access your MongoDB database.

---

### Step 4: Verify Deployment

#### 4.1: Test Backend

1. **Health Check:**
   ```
   GET https://heimage-bot-backend.onrender.com/api/health
   ```
   **Expected:** `{"status":"ok","timestamp":"..."}`

2. **Check Logs:**
   - Go to Render Dashboard → Backend Service → Logs
   - Should show: `✅ MongoDB connected`
   - Should show: `Server listening on port 10000`

#### 4.2: Test Frontend

1. Go to your frontend URL: `https://heimage-bot-frontend.onrender.com`
2. You should see the Heimage Bot homepage
3. Try to sign up
4. Try to login
5. Try to generate an image

#### 4.3: Check MongoDB

1. Go to MongoDB Atlas Dashboard
2. Click **Data Explorer**
3. Select database `heimeimage`
4. Click collection `users`
5. You should see user documents

---

## 🔧 Troubleshooting

### Issue: Backend Not Starting

**Solution:**
1. Check backend logs in Render Dashboard
2. Verify all environment variables are set
3. Check if MongoDB connection is working
4. Verify PORT is set to `10000`

### Issue: Frontend Can't Connect to Backend

**Solution:**
1. Check if `VITE_API_BASE_URL` is correct
2. Verify backend URL is accessible
3. Check CORS settings in backend
4. Verify `CLIENT_URL` in backend matches frontend URL

### Issue: MongoDB Connection Failed

**Solution:**
1. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Verify `MONGO_URI` is correct
3. Check user permissions in MongoDB Atlas
4. Verify database name is `heimeimage`

---

## ✅ Deployment Checklist

### Before Deployment

- [x] Code is pushed to GitHub
- [x] .gitignore excludes .env files
- [x] All dependencies are in package.json
- [x] Build scripts are correct

### Backend Deployment

- [ ] Backend service created on Render
- [ ] Environment variables are set
- [ ] Build command is correct: `npm install`
- [ ] Start command is correct: `npm start`
- [ ] Health check path is set: `/api/health`
- [ ] Service is deployed and running
- [ ] Backend URL is accessible

### Frontend Deployment

- [ ] Frontend service created on Render
- [ ] Environment variables are set
- [ ] Build command is correct: `npm install && npm run build`
- [ ] Publish directory is correct: `dist`
- [ ] Service is deployed and running
- [ ] Frontend URL is accessible

### After Deployment

- [ ] Backend `CLIENT_URL` is updated with frontend URL
- [ ] Frontend `VITE_API_BASE_URL` is updated with backend URL
- [ ] MongoDB IP whitelist is updated
- [ ] Health check is working
- [ ] Signup is working
- [ ] Login is working
- [ ] Image generation is working
- [ ] History is working

---

## 🎯 Quick Reference

### Backend URL
```
https://heimage-bot-backend.onrender.com
```

### Frontend URL
```
https://heimage-bot-frontend.onrender.com
```

### API Base URL
```
https://heimage-bot-backend.onrender.com/api
```

### Health Check
```
https://heimage-bot-backend.onrender.com/api/health
```

---

## 📝 Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
JWT_SECRET=your_random_secret_key_32_chars_min
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=https://heimage-bot-frontend.onrender.com
```

### Frontend (Render)
```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

---

## 🎉 Deployment Complete!

Your Heimage Bot is now live on Render! 🚀

**Backend:** `https://heimage-bot-backend.onrender.com`
**Frontend:** `https://heimage-bot-frontend.onrender.com`

---

## 📚 Next Steps

1. **Test all features** on the deployed app
2. **Monitor logs** for any errors
3. **Check MongoDB** to verify data is saving
4. **Update environment variables** if needed
5. **Set up monitoring** and alerts

---

That's it! Your Heimage Bot is now deployed to Render! 🎨🤖

