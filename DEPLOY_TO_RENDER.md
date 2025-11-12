# 🚀 Quick Guide: Deploy to Render

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy Backend to Render

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click:** New + → Web Service
3. **Connect:** Your GitHub repository
4. **Configure:**
   - **Name:** `heimage-bot-backend`
   - **Environment:** `Node`
   - **Region:** `Oregon`
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://aithorappan_db_user:<PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_32_chars_minimum
   CLIPDROP_API_KEY=a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

6. **Click:** Create Web Service
7. **Wait:** 5-10 minutes for deployment
8. **Note:** Your backend URL (e.g., `https://heimage-bot-backend.onrender.com`)

### 3. Deploy Frontend to Render

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click:** New + → Static Site
3. **Connect:** Your GitHub repository
4. **Configure:**
   - **Name:** `heimage-bot-frontend`
   - **Branch:** `main`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

5. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
   ```

6. **Click:** Create Static Site
7. **Wait:** 3-5 minutes for deployment
8. **Note:** Your frontend URL (e.g., `https://heimage-bot-frontend.onrender.com`)

### 4. Update URLs

1. **Update Backend CLIENT_URL:**
   - Go to Render Dashboard → Backend Service → Environment
   - Update `CLIENT_URL` to your frontend URL
   - Save and wait for redeploy

2. **Update MongoDB Atlas IP Whitelist:**
   - Go to MongoDB Atlas → Network Access → IP Access List
   - Add `0.0.0.0/0` (allows all IPs)
   - Click Confirm

### 5. Test Deployment

1. **Test Backend:** `https://heimage-bot-backend.onrender.com/api/health`
2. **Test Frontend:** `https://heimage-bot-frontend.onrender.com`
3. **Test Signup:** Create a new account
4. **Test Image Generation:** Generate an image

---

## ✅ Deployment Complete!

Your Heimage Bot is now live on Render! 🎉

**Backend:** `https://heimage-bot-backend.onrender.com`
**Frontend:** `https://heimage-bot-frontend.onrender.com`

---

For detailed instructions, see `RENDER_DEPLOYMENT.md`

