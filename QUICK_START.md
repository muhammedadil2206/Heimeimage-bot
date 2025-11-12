# 🚀 Quick Start Guide

## Single Command to Start Everything

From the project root, run:

```bash
npm run dev
```

That's it! This will start both:
- **Backend** on `http://localhost:5000`
- **Frontend** on `http://localhost:5173`

---

## First Time Setup

### Step 1: Install Dependencies

```bash
npm run install:all
```

This will install dependencies for:
- Root project
- Server (backend)
- Client (frontend)

### Step 2: Set Up Environment Variables

#### Backend (`server/.env`):

```env
PORT=5000
MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
JWT_SECRET=your_random_secret_key_32_chars_min
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=http://localhost:5173
```

#### Frontend (`client/.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Start the Application

```bash
npm run dev
```

---

## What Happens When You Run `npm run dev`?

1. **Backend starts** on port 5000
2. **Frontend starts** on port 5173
3. Both run in the same terminal with colored output
4. You can see logs from both services
5. Press `Ctrl+C` to stop both services

---

## Available Commands

### Start Both (Recommended):
```bash
npm run dev
```

### Start Backend Only:
```bash
npm run dev:server
```

### Start Frontend Only:
```bash
npm run dev:client
```

### Install All Dependencies:
```bash
npm run install:all
```

---

## Troubleshooting

### Issue: "command not found: npm run dev"

**Solution:** Make sure you're in the project root directory and have installed dependencies:
```bash
npm install
```

### Issue: "Cannot find module 'concurrently'"

**Solution:** Install root dependencies:
```bash
npm install
```

### Issue: Backend or Frontend Not Starting

**Solution:** Check if you have set up environment variables correctly. See Step 2 above.

### Issue: Port Already in Use

**Solution:** 
- Backend (port 5000): Check if another process is using port 5000
- Frontend (port 5173): Vite will automatically use the next available port

---

## Next Steps

1. Open `http://localhost:5173` in your browser
2. Sign up for a new account
3. Log in
4. Generate an image!

---

That's it! You're ready to go! 🎉

