# 🚀 Heimage Bot - Complete Guide

## 📋 Table of Contents
1. [Run Locally](#-run-locally)
2. [Deploy to Render](#-deploy-to-render)

---

## 💻 Run Locally

### First Time Setup

**Install all dependencies:**
```bash
npm run install:all
```

### Run Everything (Single Command)

**In VS Code Terminal (or any terminal):**
```bash
npm start
```

Or:
```bash
node index.js
```

Or:
```bash
npm run dev
```

**That's it!** One command runs everything. 🚀

This starts both:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

Press `Ctrl+C` to stop both servers.

### Environment Variables (Local)

Create `.env` file in `server/` folder:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/heimeimage
JWT_SECRET=your-random-secret-key
CLIPDROP_API_KEY=your-clipdrop-api-key
NODE_ENV=development
```

---

## 🚀 Deploy to Render

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

## 📁 Project Structure

```
heimage-bot/
├── client/          # React frontend
├── server/          # Express backend
├── render.yaml      # Render config (auto-deploy)
└── README.md        # This file (everything you need)
```

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
- ✅ Auto-deploy enabled by default - future pushes will auto-deploy

---

## ✅ Quick Commands Reference

```bash
# Install dependencies (first time)
npm run install:all

# Run everything (single command) ⭐
npm start

# Or use this (same thing)
npm run dev

# Run backend only
npm run dev:server

# Run frontend only
npm run dev:client

# Build for production
npm run build
```

**Note:** `npm start` now uses a Node.js script that works reliably in VS Code and all terminals.

---

## 🎉 That's It!

**Local:** Just run `npm run dev`  
**Deploy:** Copy & paste the values above in Render

Everything else is automatic!
