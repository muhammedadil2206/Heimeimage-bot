# 🚀 Heimage Bot - Deploy to Render

## ⚡ Quick Deploy (2 Steps)

### Step 1: Create Service in Render

Go to https://dashboard.render.com → New Web Service

**Copy & Paste These 3 Values:**

```
Name: heimage-bot
Build Command: cd client && npm install && npm run build && cd ../server && npm install
Start Command: cd server && npm start
```

### Step 2: Add 3 Environment Variables

In Render Dashboard → Environment Variables:

```
NODE_ENV = production
MONGO_URI = [your-mongodb-connection-string]
JWT_SECRET = [any-random-string]
CLIPDROP_API_KEY = [your-clipdrop-api-key]
```

**Done!** 🎉 Your app will be live in 2-3 minutes.

---

## 📁 Project Structure

```
heimage-bot/
├── client/          # React frontend
├── server/          # Express backend
├── render.yaml      # Render config (auto-deploy)
└── README.md        # This file
```

---

## 🔧 How It Works

- **Build:** Installs client → Builds React → Installs server
- **Start:** Express serves API at `/api` and React at `/`
- **One URL:** Everything on `https://heimage-bot.onrender.com`

---

## ✅ That's It!

Just use the 3 values above. Everything else is automatic!

