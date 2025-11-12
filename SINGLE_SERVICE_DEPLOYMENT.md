# 🚀 Single Service Deployment Guide

## ✅ Everything Combined into ONE Service!

Your app now deploys as a **single service** - backend serves both API and frontend.

---

## 📋 What to Fill in Render (Single Service)

### Basic Settings:
```
Name: heimage-bot
Project: My project (or leave default)
Environment: Production
Language: Node
Branch: main
Region: Oregon (US West) (or your preferred region)
Root Directory: (leave empty)
```

### Build & Start Commands:
```
Build Command: cd client && npm install && npm run build && cd ../server && npm install

Start Command: cd server && npm start
```

### Instance Type:
```
Instance Type: Free ($0/month)
```

### Environment Variables (Add these 3):
```
NAME: NODE_ENV
VALUE: production

NAME: MONGO_URI
VALUE: mongodb+srv://username:password@cluster.mongodb.net/heimeimage?retryWrites=true&w=majority
(Replace with your actual MongoDB connection string)

NAME: JWT_SECRET
VALUE: [Generate a random string - use any long random string]

NAME: CLIPDROP_API_KEY
VALUE: [Your Clipdrop API key]
```

**That's it!** Only 3 environment variables needed (no CLIENT_URL or VITE_API_BASE_URL needed).

---

## 🎯 How It Works

1. **Build Phase:**
   - Installs client dependencies
   - Builds React app to `client/dist`
   - Installs server dependencies

2. **Start Phase:**
   - Starts Express server
   - Server serves API at `/api/*`
   - Server serves React app at `/*` (all other routes)

3. **Single URL:**
   - Everything on one domain: `https://heimage-bot.onrender.com`
   - Frontend: `https://heimage-bot.onrender.com`
   - API: `https://heimage-bot.onrender.com/api`

---

## ✅ Benefits

- ✅ **Simpler setup** - Only one service to configure
- ✅ **No CORS issues** - Same domain for frontend and API
- ✅ **Fewer environment variables** - No CLIENT_URL or VITE_API_BASE_URL needed
- ✅ **Lower cost** - Only one free service instead of two
- ✅ **Easier maintenance** - One service to monitor

---

## 📝 Quick Checklist

- [ ] Name: `heimage-bot`
- [ ] Build: `cd client && npm install && npm run build && cd ../server && npm install`
- [ ] Start: `cd server && npm start`
- [ ] Add 3 environment variables: `NODE_ENV`, `MONGO_URI`, `JWT_SECRET`, `CLIPDROP_API_KEY`
- [ ] Click "Create Web Service"
- [ ] Wait 2-3 minutes for deployment
- [ ] Visit your URL and test!

---

## 🔍 How to Verify It Works

1. Visit your service URL (e.g., `https://heimage-bot.onrender.com`)
2. You should see your React app
3. Try signing up/logging in
4. Generate an image
5. Check that API calls work (they use `/api` automatically)

---

## 🆘 Troubleshooting

**Frontend not loading?**
- Check build logs - make sure `client/dist` was created
- Verify static file serving is enabled in `server.js`

**API not working?**
- Check that routes start with `/api`
- Verify MongoDB connection in logs
- Check environment variables are set

**Build fails?**
- Make sure both `client` and `server` directories exist
- Check that `package.json` files are in both directories

---

## 🎉 That's It!

One service, one URL, everything works! 🚀

