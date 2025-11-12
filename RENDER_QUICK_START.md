# ⚡ Render Deployment - Quick Start

Quick reference for deploying backend to Render.

---

## 🚀 Quick Steps

### 1. MongoDB Atlas Setup
```
1. Create cluster → Name: heimeimage
2. Create database user → Username: heimage_user
3. Network Access → Add 0.0.0.0/0
4. Get connection string → Add /heimeimage before ?
```

### 2. Render Deployment
```
1. Go to render.com → Sign up
2. New + → Web Service
3. Connect GitHub → Select repo
4. Configure:
   - Root Directory: server
   - Build Command: npm install
   - Start Command: npm start
   - Plan: Free
```

### 3. Environment Variables (Set in Render)
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/heimeimage?...
JWT_SECRET=your_32_char_random_string
CLIPDROP_API_KEY=your_clipdrop_key
CLIENT_URL=https://your-frontend.vercel.app (update after frontend deploy)
```

### 4. Test Deployment
```
Health Check: https://your-backend.onrender.com/api/health
Should return: {"status":"ok","timestamp":"..."}
```

---

## 📋 Files Created

✅ `render.yaml` - Render configuration (optional, can use UI instead)
✅ `RENDER_DEPLOYMENT_GUIDE.md` - Complete detailed guide

---

## 🔗 Important URLs

- **Render Dashboard:** https://dashboard.render.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Your Backend URL:** `https://heimage-bot-backend.onrender.com` (after deployment)

---

## ⚠️ Important Notes

1. **Root Directory:** Must be `server` (not root)
2. **MongoDB URI:** Must include `/heimeimage` database name
3. **CLIENT_URL:** Update after frontend is deployed
4. **Free Tier:** Service sleeps after 15 min inactivity (30s cold start)
5. **Build Time:** 2-5 minutes first time

---

## ✅ Verification Checklist

- [ ] Health endpoint works
- [ ] Signup endpoint works
- [ ] MongoDB connected (check logs)
- [ ] No errors in logs
- [ ] Environment variables all set

---

**See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions!**

