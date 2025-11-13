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

## 🚀 Deploy to Render (Single Service - Backend + Frontend)

### Option 1: Using render.yaml (Automatic - Recommended)

1. **Push to GitHub** - Your `render.yaml` is already configured!
2. Go to https://dashboard.render.com
3. Click **"New +"** → **"Blueprint"**
4. Connect your GitHub repo: `muhammedadil2206/Heimeimage-bot`
5. Render will automatically read `render.yaml` and create the service
6. **Add Environment Variables** in Render Dashboard:
   - `MONGO_URI` = [your-mongodb-connection-string]
   - `JWT_SECRET` = [any-random-string]
   - `CLIPDROP_API_KEY` = [your-clipdrop-api-key]
7. Click **"Apply"** → Wait 2-3 minutes → **Done!** 🎉

**Everything works on one URL:** `https://heimage-bot.onrender.com`
- Frontend: `https://heimage-bot.onrender.com`
- API: `https://heimage-bot.onrender.com/api`

### Option 2: Manual Setup

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select repo: `muhammedadil2206/Heimeimage-bot`

**Fill These Fields:**

```
Name: heimage-bot
Environment: Node
Branch: main
Root Directory: (leave empty)

Build Command: cd client && npm install && npm run build && cd ../server && npm install
Start Command: cd server && node server.js

Instance Type: Free
```

**Add Environment Variables:**
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
- **Start:** Express serves API at `/api` and React frontend at `/`
- **One URL:** Everything on `https://heimage-bot.onrender.com`
- **Login/Signup:** Works automatically - same domain, no CORS issues!

---

## ⚠️ Important Notes

- ✅ Don't set `PORT` - Render sets it automatically
- ✅ No `CLIENT_URL` or `VITE_API_BASE_URL` needed (same domain)
- ✅ Login/Signup works automatically - backend and frontend on same domain
- ✅ Free tier sleeps after 15 min - first request may be slow
- ✅ Auto-deploy enabled by default - future pushes will auto-deploy
- ✅ Single push deploys both backend and frontend together

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
