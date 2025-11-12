# 🚀 Heimage Bot - Deploy to Render

## ⚡ Quick Deploy (2 Steps)

### Step 1: Create Service in Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select repo: `muhammedadil2206/Heimeimage-bot`

**Fill These Fields:**

```
Name: heimage-bot
Environment: Node
Branch: main
Region: Oregon (or closest to you)
Root Directory: (leave empty)

Build Command: cd client && npm install && npm run build && cd ../server && npm install
Start Command: cd server && npm start

Instance Type: Free
```

### Step 2: Add Environment Variables

Click **"Add Environment Variable"** and add:

```
NODE_ENV = production
MONGO_URI = [your-mongodb-connection-string]
JWT_SECRET = [any-random-string]
CLIPDROP_API_KEY = [your-clipdrop-api-key]
```

**Click "Create Web Service"** → Wait 2-3 minutes → **Done!** 🎉

---

## 📁 Files You Need

**Only 2 files matter:**
1. **`README.md`** - This file (deployment guide)
2. **`render.yaml`** - Auto-config (optional, makes it easier)

Everything else is your code (client/, server/, etc.)

---

## 🔧 How It Works

- **Build:** Installs client → Builds React → Installs server
- **Start:** Express serves API at `/api` and React at `/`
- **One URL:** Everything on `https://heimage-bot.onrender.com`

---

## ⚠️ Important Notes

- ✅ Don't set `PORT` - Render sets it automatically
- ✅ No `CLIENT_URL` or `VITE_API_BASE_URL` needed (same domain)
- ✅ Free tier sleeps after 15 min - first request may be slow
- ✅ Auto-deploy enabled by default - future pushes auto-deploy

---

## ✅ That's It!

Just copy & paste the values above. Everything else is automatic!

