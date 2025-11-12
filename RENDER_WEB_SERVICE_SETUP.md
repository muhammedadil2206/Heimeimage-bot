# 📝 Render Web Service Setup - Exact Values to Fill

## ✅ SINGLE SERVICE SETUP (Recommended)

Everything is now combined into **ONE service** - simpler and easier!

---

## 🎯 Single Service Setup

### Step 1: Create New Web Service
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not already connected)
4. Select repository: **`muhammedadil2206/Heimeimage-bot`**

### Step 2: Fill in Service Details

**Basic Settings:**
```
Name: heimage-bot
Region: (Choose closest to you - e.g., Oregon, Frankfurt, etc.)
Branch: main
Root Directory: (leave empty)
```

**Build & Deploy:**
```
Environment: Node
Build Command: cd client && npm install && npm run build && cd ../server && npm install
Start Command: cd server && npm start
```

**Plan:**
```
Plan: Free (or choose Starter/Standard if you want)
```

**Advanced Settings (click "Advanced"):**
```
Auto-Deploy: Yes (enabled by default)
```

### Step 3: Add Environment Variables

Click **"Add Environment Variable"** and add these one by one:

```
Key: NODE_ENV
Value: production
```

```
Key: MONGO_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/heimeimage?retryWrites=true&w=majority
(Replace with your actual MongoDB connection string)
```

```
Key: JWT_SECRET
Value: [Generate a random string - use: openssl rand -hex 32]
(Or use any long random string like: mySuperSecretJWTKey123456789)
```

```
Key: CLIPDROP_API_KEY
Value: [Your Clipdrop API key]
```

**Note:** 
- Don't add `PORT` - Render sets it automatically!
- No need for `CLIENT_URL` or `VITE_API_BASE_URL` - same domain!

### Step 4: Create Service
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- **Visit your URL** - both frontend and API work on the same domain!

---

## 📋 Quick Reference Checklist

### Single Service:
- [ ] Name: `heimage-bot`
- [ ] Build: `cd client && npm install && npm run build && cd ../server && npm install`
- [ ] Start: `cd server && npm start`
- [ ] Env: `NODE_ENV=production`
- [ ] Env: `MONGO_URI=[your-mongodb-uri]`
- [ ] Env: `JWT_SECRET=[random-secret]`
- [ ] Env: `CLIPDROP_API_KEY=[your-key]`
- [ ] ✅ Done! One service, one URL, everything works!

---

## ⚠️ Important Notes:

1. **Don't set PORT** - Render does this automatically
2. **Update CLIENT_URL** after frontend deploys
3. **Use actual URLs** - Replace placeholder URLs with your real ones
4. **Free tier** services sleep after 15 min - first request may be slow
5. **Auto-deploy** is enabled by default - future pushes will auto-deploy

---

## 🆘 Common Mistakes to Avoid:

❌ **Don't** set PORT manually  
❌ **Don't** use `localhost` in production URLs  
❌ **Don't** forget to update CLIENT_URL after frontend deploys  
❌ **Don't** use quotes around environment variable values  
✅ **Do** use the exact backend URL in VITE_API_BASE_URL  
✅ **Do** wait for backend to deploy before setting frontend URL  

---

## 🎉 That's It!

Once both services are deployed and URLs are updated, your app will be live!

Visit your frontend URL to test it out.

