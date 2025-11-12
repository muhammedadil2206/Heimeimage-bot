# 🚀 Netlify Deployment Guide

## 📋 Netlify Settings for Frontend

### Basic Settings

**Branch to deploy:** `main`  
**Base directory:** `client`  
**Build command:** `npm install && npm run build`  
**Publish directory:** `dist`  
**Functions directory:** Leave empty (or don't set)

---

## 🎯 Step-by-Step Netlify Deployment

### Step 1: Deploy Frontend to Netlify

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
   - **Functions directory:** Leave empty

5. **Environment Variables:**
   - Click "Advanced" → "New variable"
   - Add:
     ```
     VITE_API_BASE_URL = https://your-backend-url.vercel.app/api
     ```
   - **Important:** Replace `your-backend-url.vercel.app` with your actual backend URL

6. **Click:** "Deploy site"
7. **Wait:** 2-3 minutes
8. **Copy:** Your frontend URL (e.g., `https://heimage-bot-frontend.netlify.app`)

---

## 🔧 Detailed Settings Explanation

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

## ⚠️ Important: Backend Deployment

### Backend Should Be on Vercel or Render

**Why?**
- Netlify Functions have timeout limits (10s free, 26s pro)
- Image generation might take longer
- Vercel/Render is better for backend

**Recommended Setup:**
- **Frontend:** Netlify (Static Site)
- **Backend:** Vercel or Render (Server)

---

## 📝 Complete Netlify Settings

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

---

## 🔄 After Deployment

### Step 1: Update Backend CLIENT_URL

1. **Go to:** Vercel Dashboard → Backend Project → Settings → Environment Variables
2. **Update:** `CLIENT_URL` to your Netlify frontend URL
3. **Example:** `https://heimage-bot-frontend.netlify.app`
4. **Save** and redeploy

### Step 2: Test Deployment

1. **Go to:** Your Netlify frontend URL
2. **Test:** Sign up
3. **Test:** Login
4. **Test:** Image generation

---

## ✅ Quick Checklist

### Netlify Frontend:
- [ ] Branch to deploy: `main`
- [ ] Base directory: `client`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: Empty
- [ ] Environment variable: `VITE_API_BASE_URL` set
- [ ] Frontend deployed and accessible

### Backend (Vercel/Render):
- [ ] Backend deployed to Vercel or Render
- [ ] Environment variables set
- [ ] `CLIENT_URL` updated to Netlify frontend URL
- [ ] Backend accessible

### After Deployment:
- [ ] Frontend URL works
- [ ] Backend URL works
- [ ] Signup works
- [ ] Login works
- [ ] Image generation works

---

## 🎯 Summary

### Netlify Settings:

**Branch to deploy:** `main`  
**Base directory:** `client`  
**Build command:** `npm install && npm run build`  
**Publish directory:** `dist`  
**Functions directory:** Leave empty

### Environment Variable:

```
VITE_API_BASE_URL = https://your-backend-url.vercel.app/api
```

---

That's it! Fill in these settings and deploy! 🚀

