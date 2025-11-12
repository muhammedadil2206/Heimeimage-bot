# 📝 Render Web Service Setup - Exact Values to Fill

## 🎯 Backend Service Setup

### Step 1: Create New Web Service
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not already connected)
4. Select repository: **`muhammedadil2206/Heimeimage-bot`**

### Step 2: Fill in Backend Service Details

**Basic Settings:**
```
Name: heimage-bot-backend
Region: (Choose closest to you - e.g., Oregon, Frankfurt, etc.)
Branch: main
Root Directory: (leave empty)
```

**Build & Deploy:**
```
Environment: Node
Build Command: cd server && npm install
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

### Step 3: Add Environment Variables (Backend)

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

```
Key: CLIENT_URL
Value: https://heimage-bot-frontend.onrender.com
(Update this AFTER frontend deploys - use the actual frontend URL)
```

**Note:** Don't add `PORT` - Render sets it automatically!

### Step 4: Create Backend Service
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- **Copy the service URL** (e.g., `https://heimage-bot-backend.onrender.com`)

---

## 🎨 Frontend Service Setup

### Step 1: Create New Web Service
1. Still in Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Select the same repository: **`muhammedadil2206/Heimeimage-bot`**

### Step 2: Fill in Frontend Service Details

**Basic Settings:**
```
Name: heimage-bot-frontend
Region: (Same as backend - e.g., Oregon, Frankfurt, etc.)
Branch: main
Root Directory: (leave empty)
```

**Build & Deploy:**
```
Environment: Node
Build Command: cd client && npm install && npm run build
Start Command: cd client && npx serve -s dist -l $PORT
```

**Plan:**
```
Plan: Free (or choose Starter/Standard if you want)
```

**Advanced Settings:**
```
Auto-Deploy: Yes (enabled by default)
```

### Step 3: Add Environment Variables (Frontend)

Click **"Add Environment Variable"** and add:

```
Key: VITE_API_BASE_URL
Value: https://heimage-bot-backend.onrender.com/api
(Use the ACTUAL backend URL you copied in Step 4 above)
```

**That's it for frontend!** Only one environment variable needed.

### Step 4: Create Frontend Service
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- **Copy the frontend URL** (e.g., `https://heimage-bot-frontend.onrender.com`)

---

## 🔄 Final Step: Update Backend CLIENT_URL

After frontend deploys:

1. Go back to **backend service** → **Environment** tab
2. Find `CLIENT_URL` variable
3. Click **"Edit"**
4. Update value to your actual frontend URL: `https://heimage-bot-frontend.onrender.com`
5. Click **"Save Changes"**
6. Service will auto-redeploy

---

## 📋 Quick Reference Checklist

### Backend Service:
- [ ] Name: `heimage-bot-backend`
- [ ] Build: `cd server && npm install`
- [ ] Start: `cd server && npm start`
- [ ] Env: `NODE_ENV=production`
- [ ] Env: `MONGO_URI=[your-mongodb-uri]`
- [ ] Env: `JWT_SECRET=[random-secret]`
- [ ] Env: `CLIPDROP_API_KEY=[your-key]`
- [ ] Env: `CLIENT_URL=[frontend-url]` (update after frontend deploys)

### Frontend Service:
- [ ] Name: `heimage-bot-frontend`
- [ ] Build: `cd client && npm install && npm run build && npm install -g serve`
- [ ] Start: `serve -s client/dist -l $PORT`
- [ ] Env: `VITE_API_BASE_URL=[backend-url]/api`

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

