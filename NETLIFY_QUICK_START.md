# 🚀 Netlify Quick Start - Simple Guide

## ✅ Netlify Settings (Fill These In)

### Build & Deploy Settings:

**Branch to deploy:** `main`  
**Base directory:** `client`  
**Build command:** `npm install && npm run build`  
**Publish directory:** `dist`  
**Functions directory:** (leave empty - don't fill)

---

## 📋 Step-by-Step

### Step 1: Go to Netlify

1. **Go to:** https://app.netlify.com
2. **Click:** "Add new site" → "Import an existing project"
3. **Connect GitHub:**
   - Click "GitHub"
   - Authorize Netlify
   - Select: `muhammedadil2206/Heimeimage-bot`

### Step 2: Fill in Settings

**Branch to deploy:**
```
main
```

**Base directory:**
```
client
```

**Build command:**
```
npm install && npm run build
```

**Publish directory:**
```
dist
```

**Functions directory:**
```
(leave empty - don't fill anything)
```

### Step 3: Add Environment Variable

1. **Click:** "Advanced" → "New variable"
2. **Key:** `VITE_API_BASE_URL`
3. **Value:** `https://your-backend-url.vercel.app/api`
4. **Important:** Replace `your-backend-url.vercel.app` with your actual backend URL

### Step 4: Deploy

1. **Click:** "Deploy site"
2. **Wait:** 2-3 minutes
3. **Copy:** Your frontend URL

---

## ⚠️ Important: Deploy Backend First!

### Step 1: Deploy Backend to Vercel or Render

**You MUST deploy backend FIRST before deploying frontend to Netlify!**

#### Quick Backend Deployment (Vercel):

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

#### Then Deploy Frontend to Netlify:

1. **Get backend URL from Step 1**
2. **Deploy frontend to Netlify** (see steps below)
3. **Set `VITE_API_BASE_URL` to your backend URL**
4. **Update backend `CLIENT_URL` to your Netlify frontend URL**

### Why Netlify for Frontend?

- ✅ Great for static sites (React)
- ✅ Free CDN
- ✅ Fast deployment
- ✅ Easy to use

### Why Not Netlify for Backend?

- ❌ Function timeout limits (10s free)
- ❌ Image generation might take longer
- ✅ Better to use Vercel or Render for backend

---

## 📝 Complete Settings

### Netlify Build Settings:

```
Branch to deploy: main
Base directory: client
Build command: npm install && npm run build
Publish directory: dist
Functions directory: (leave empty)
```

### Environment Variable:

```
VITE_API_BASE_URL = https://your-backend-url.vercel.app/api
```

---

## ✅ Quick Checklist

- [ ] Branch to deploy: `main`
- [ ] Base directory: `client`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: Empty
- [ ] Environment variable: `VITE_API_BASE_URL` set
- [ ] Backend deployed first
- [ ] Frontend deployed
- [ ] Test signup
- [ ] Test login
- [ ] Test image generation

---

## 🎯 Summary

**Fill in Netlify:**
- Branch: `main`
- Base directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Functions directory: (leave empty)

**Add Environment Variable:**
- `VITE_API_BASE_URL = https://your-backend-url.vercel.app/api`

**Result:**
- Frontend on Netlify ✅
- Backend on Vercel/Render ✅
- App works on internet ✅

---

That's it! Fill in these settings and deploy! 🚀

Need help? Just ask! 😊

