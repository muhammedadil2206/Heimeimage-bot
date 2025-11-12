# 🚀 Deploy Heimage Bot to Render

Complete guide to deploy your Heimage Bot application to Render.

---

## 📋 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Push your code to GitHub
3. **MongoDB Atlas** - Database is already set up
4. **Clipdrop API Key** - Already have the API key

---

## 🎯 Deployment Strategy

### Option 1: Render for Both (Recommended)
- **Backend:** Render Web Service
- **Frontend:** Render Static Site (or Vercel/Netlify)

### Option 2: Render Backend + Vercel Frontend
- **Backend:** Render Web Service
- **Frontend:** Vercel (better for React apps)

---

## 📦 Step 1: Prepare Your Code

### 1.1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 1.2: Create .gitignore

Make sure `.gitignore` includes:
```
node_modules/
.env
server/.env
client/.env
dist/
client/dist/
.DS_Store
Thumbs.db
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Select your repository

### 2.2: Configure Backend Service

**Basic Settings:**
- **Name:** `heimage-bot-backend`
- **Environment:** `Node`
- **Region:** `Oregon` (or closest to you)
- **Branch:** `main`
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_min_32_chars
CLIPDROP_API_KEY=a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
CLIENT_URL=https://your-frontend-url.onrender.com
```

**Important:**
- Replace `<YOUR_PASSWORD>` with your actual MongoDB password
- Replace `your_random_secret_key_min_32_chars` with a strong random string (32+ characters)
- Replace `your-frontend-url.onrender.com` with your actual frontend URL

### 2.3: Advanced Settings

**Health Check:**
- **Health Check Path:** `/api/health`

**Auto-Deploy:**
- Enable **Auto-Deploy** (deploys on every push to main branch)

**Scaling:**
- **Instance Type:** Free (or upgrade for better performance)

### 2.4: Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://heimage-bot-backend.onrender.com`

---

## 🌐 Step 3: Deploy Frontend to Render (or Vercel)

### Option A: Render Static Site

#### 3.1: Create Static Site

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Static Site**
3. Connect your GitHub repository
4. Select your repository

#### 3.2: Configure Frontend Service

**Basic Settings:**
- **Name:** `heimage-bot-frontend`
- **Branch:** `main`
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

**Environment Variables:**
```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

**Important:**
- Replace `heimage-bot-backend.onrender.com` with your actual backend URL

#### 3.3: Deploy

1. Click **Create Static Site**
2. Wait for deployment (3-5 minutes)
3. Note your frontend URL: `https://heimage-bot-frontend.onrender.com`

---

### Option B: Deploy to Vercel (Recommended for Frontend)

#### 3.1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Select your repository

#### 3.2: Configure Frontend

**Framework Preset:** `Vite`
**Root Directory:** `client`
**Build Command:** `npm run build`
**Output Directory:** `dist`

**Environment Variables:**
```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

**Important:**
- Replace `heimage-bot-backend.onrender.com` with your actual backend URL

#### 3.3: Deploy

1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Note your frontend URL: `https://your-project.vercel.app`

---

## 🔐 Step 4: Update Environment Variables

### 4.1: Update Backend CLIENT_URL

After deploying frontend, update backend `CLIENT_URL`:

1. Go to Render Dashboard
2. Click on your backend service
3. Go to **Environment** tab
4. Update `CLIENT_URL`:
   ```
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```
   or
   ```
   CLIENT_URL=https://your-project.vercel.app
   ```
5. Click **Save Changes**
6. Service will automatically redeploy

### 4.2: Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. Add `0.0.0.0/0` (allows all IPs) OR Render's IP ranges
5. Click **Confirm**

**Note:** For production, you can restrict to specific IPs, but `0.0.0.0/0` works for all Render services.

---

## ✅ Step 5: Verify Deployment

### 5.1: Test Backend

1. **Health Check:**
   ```
   GET https://heimage-bot-backend.onrender.com/api/health
   ```
   **Expected:** `{"status":"ok","timestamp":"..."}`

2. **Test Database:**
   ```
   GET https://heimage-bot-backend.onrender.com/api/test/test-db
   ```
   **Note:** This endpoint only works in development. You may need to enable it for testing.

### 5.2: Test Frontend

1. Go to your frontend URL
2. Try to sign up
3. Try to generate an image
4. Check if everything works

### 5.3: Check Logs

1. Go to Render Dashboard
2. Click on your service
3. Go to **Logs** tab
4. Check for errors or warnings

---

## 🔧 Step 6: Production Optimizations

### 6.1: Update Backend for Production

The server is already configured for production:
- ✅ Test routes are disabled in production
- ✅ CORS is configured for production URL
- ✅ Environment variables are checked
- ✅ Error handling is in place

### 6.2: Update Frontend for Production

Make sure `client/.env.production` (or environment variables in Render/Vercel) has:
```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### 6.3: Enable HTTPS

- ✅ Render automatically provides HTTPS
- ✅ Vercel automatically provides HTTPS
- ✅ No additional configuration needed

---

## 🛠️ Step 7: Troubleshooting

### Issue: Backend Not Starting

**Check:**
1. Backend logs in Render Dashboard
2. Environment variables are set correctly
3. MongoDB connection string is correct
4. Port is set to `10000` (Render's default) or use `process.env.PORT`

**Fix:**
- Check logs for errors
- Verify all environment variables are set
- Test MongoDB connection

### Issue: Frontend Can't Connect to Backend

**Check:**
1. Backend URL is correct in frontend environment variables
2. CORS is configured correctly in backend
3. Backend is running and accessible

**Fix:**
- Update `VITE_API_BASE_URL` in frontend
- Update `CLIENT_URL` in backend
- Check CORS settings

### Issue: MongoDB Connection Failed

**Check:**
1. MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. MongoDB connection string is correct
3. User has read/write permissions

**Fix:**
- Add IP to whitelist
- Verify connection string
- Check user permissions

### Issue: Environment Variables Not Working

**Check:**
1. Environment variables are set in Render Dashboard
2. Variables are spelled correctly
3. No quotes around values
4. Service is restarted after changes

**Fix:**
- Update environment variables in Render Dashboard
- Restart service
- Check logs for errors

---

## 📝 Step 8: Environment Variables Checklist

### Backend (Render)

- [ ] `NODE_ENV=production`
- [ ] `PORT=10000` (or use `process.env.PORT`)
- [ ] `MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...`
- [ ] `JWT_SECRET=your_random_secret_key_32_chars_min`
- [ ] `CLIPDROP_API_KEY=your_clipdrop_api_key`
- [ ] `CLIENT_URL=https://your-frontend-url.onrender.com`

### Frontend (Render/Vercel)

- [ ] `VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api`

---

## 🚀 Step 9: Deployment Checklist

### Before Deployment

- [ ] Code is pushed to GitHub
- [ ] .gitignore excludes .env files
- [ ] All dependencies are in package.json
- [ ] Build scripts are correct
- [ ] Environment variables are documented

### Backend Deployment

- [ ] Backend service is created on Render
- [ ] Environment variables are set
- [ ] Build command is correct
- [ ] Start command is correct
- [ ] Health check path is set
- [ ] Service is deployed and running
- [ ] Backend URL is accessible

### Frontend Deployment

- [ ] Frontend service is created (Render/Vercel)
- [ ] Environment variables are set
- [ ] Build command is correct
- [ ] Output directory is correct
- [ ] Service is deployed and running
- [ ] Frontend URL is accessible

### After Deployment

- [ ] Backend CLIENT_URL is updated
- [ ] Frontend VITE_API_BASE_URL is updated
- [ ] MongoDB IP whitelist is updated
- [ ] Health check is working
- [ ] Signup is working
- [ ] Login is working
- [ ] Image generation is working
- [ ] History is working

---

## 🎉 Step 10: Post-Deployment

### 1. Test All Features

- [ ] Sign up new user
- [ ] Login with existing user
- [ ] Generate image
- [ ] Download image
- [ ] View history
- [ ] Logout

### 2. Monitor Logs

- [ ] Check backend logs for errors
- [ ] Check frontend logs for errors
- [ ] Monitor MongoDB connection
- [ ] Monitor API usage

### 3. Set Up Monitoring

- [ ] Enable Render alerts
- [ ] Monitor service health
- [ ] Monitor API rate limits
- [ ] Monitor database usage

---

## 📚 Additional Resources

### Render Documentation
- [Render Documentation](https://render.com/docs)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Web Services](https://render.com/docs/web-services)

### MongoDB Atlas
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Connection Strings](https://docs.atlas.mongodb.com/connect-to-cluster/)
- [IP Whitelist](https://docs.atlas.mongodb.com/security/ip-access-list/)

### Deployment Guides
- `RENDER_DEPLOYMENT.md` - This file
- `DEPLOYMENT.md` - General deployment guide
- `README.md` - Main documentation

---

## 🎯 Quick Start

### 1. Deploy Backend

1. Create Web Service on Render
2. Set Root Directory: `server`
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Set Environment Variables
6. Deploy

### 2. Deploy Frontend

1. Create Static Site on Render (or Vercel)
2. Set Root Directory: `client`
3. Set Build Command: `npm install && npm run build`
4. Set Publish Directory: `dist`
5. Set Environment Variables
6. Deploy

### 3. Update URLs

1. Update backend `CLIENT_URL` with frontend URL
2. Update frontend `VITE_API_BASE_URL` with backend URL
3. Update MongoDB Atlas IP whitelist

### 4. Test

1. Test backend: `https://your-backend.onrender.com/api/health`
2. Test frontend: `https://your-frontend.onrender.com`
3. Test signup and login
4. Test image generation

---

## 🎉 Deployment Complete!

Your Heimage Bot is now live on Render! 🚀

**Backend URL:** `https://heimage-bot-backend.onrender.com`
**Frontend URL:** `https://heimage-bot-frontend.onrender.com` (or Vercel URL)

Enjoy your deployed application! 🎨🤖

---

## 🔄 Updating Deployment

### To Update Backend:

1. Push changes to GitHub
2. Render will automatically redeploy
3. Check logs for errors

### To Update Frontend:

1. Push changes to GitHub
2. Render/Vercel will automatically redeploy
3. Check logs for errors

### To Update Environment Variables:

1. Go to Render Dashboard
2. Click on your service
3. Go to **Environment** tab
4. Update variables
5. Click **Save Changes**
6. Service will automatically redeploy

---

That's it! Your Heimage Bot is now deployed to Render! 🎉

