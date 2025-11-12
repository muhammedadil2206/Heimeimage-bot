# 🚀 Quick Start: Deploy to Render

## TL;DR - What Happens Automatically:

✅ **When you push to GitHub:**
- Render auto-detects the push
- Builds and deploys your services automatically
- Assigns permanent URLs (they never change)
- Uses environment variables you set once

⚠️ **What you need to do ONCE (first time only):**
1. Connect GitHub repo to Render
2. Set environment variables in Render Dashboard
3. That's it! Future pushes = auto-deploy

---

## 📋 Step-by-Step (5 Minutes):

### 1️⃣ Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push
```

### 2️⃣ Create Services in Render

**Option A: Using Blueprint (Easiest)**
1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo
4. Render will read `render.yaml` and create both services automatically
5. Skip to Step 3

**Option B: Manual Setup**
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Name: `heimage-bot-backend`
5. Build: `cd server && npm install`
6. Start: `cd server && npm start`
7. Repeat for frontend (name: `heimage-bot-frontend`)

### 3️⃣ Deploy Backend First

1. **Backend will get URL:** `https://heimage-bot-backend.onrender.com` (or similar)
2. **Add Environment Variables** in Render Dashboard:
   ```
   MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/heimeimage
   JWT_SECRET = [generate random string]
   CLIPDROP_API_KEY = [your clipdrop key]
   CLIENT_URL = [leave empty for now, add after frontend deploys]
   ```
3. Click "Create Web Service"
4. Wait for deployment (2-3 minutes)
5. **Copy the backend URL** (e.g., `https://heimage-bot-backend.onrender.com`)

### 4️⃣ Deploy Frontend

1. **Frontend will get URL:** `https://heimage-bot-frontend.onrender.com` (or similar)
2. **Add Environment Variable:**
   ```
   VITE_API_BASE_URL = https://heimage-bot-backend.onrender.com/api
   ```
   (Use the actual backend URL from Step 3)
3. Click "Create Web Service"
4. Wait for deployment (2-3 minutes)
5. **Copy the frontend URL**

### 5️⃣ Update Backend CLIENT_URL

1. Go back to backend service
2. Go to "Environment" tab
3. Update `CLIENT_URL` = `https://heimage-bot-frontend.onrender.com` (your actual frontend URL)
4. Save (service will auto-redeploy)

### 6️⃣ Enable Auto-Deploy (Important!)

For both services:
1. Go to service settings
2. Find "Auto-Deploy" section
3. Enable "Auto-Deploy" (should be on by default)
4. ✅ Done!

---

## 🎉 That's It!

**Now every time you push to GitHub:**
- ✅ Render automatically builds and deploys
- ✅ URLs stay the same
- ✅ Environment variables persist
- ✅ No manual work needed!

---

## 🔍 Verify It Works:

1. Visit your frontend URL
2. Try signing up
3. Generate an image
4. Check backend logs in Render Dashboard if issues

---

## ❓ Common Questions:

**Q: Do I need to update URLs every time I push?**  
A: No! URLs are permanent. Set them once, they never change.

**Q: What if I change environment variables?**  
A: Update them in Render Dashboard, service will auto-redeploy.

**Q: Can I use a custom domain?**  
A: Yes! Add it in Render Dashboard → Custom Domains (paid plans).

**Q: Why is first request slow?**  
A: Free tier services "sleep" after 15 min inactivity. First request wakes them up (30-60 sec).

---

## 🆘 Need Help?

Check `RENDER_DEPLOYMENT.md` for detailed troubleshooting.

