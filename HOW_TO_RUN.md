# 🚀 How to Run Heimage Bot

## Quick Start

### Step 1: Install Dependencies (First Time Only)

From the project root directory:

```bash
npm run install:all
```

This will install dependencies for:
- Root (concurrently)
- Server (backend)
- Client (frontend)

### Step 2: Start the Application

From the project root directory:

```bash
npm run dev
```

This single command will start:
- ✅ Backend server on `http://localhost:5000`
- ✅ Frontend server on `http://localhost:5173`

### Step 3: Open Your Browser

Go to: **http://localhost:5173**

---

## Detailed Instructions

### Prerequisites

1. **Node.js 18+** installed
2. **MongoDB connection string** in `server/.env`
3. **Clipdrop API key** in `server/.env`

### Setup Environment Variables

#### Backend (`server/.env`):
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_random_secret_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=http://localhost:5173
```

#### Frontend (`client/.env`):
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Running Commands

### Option 1: Start Both Together (Recommended)

```bash
npm run dev
```

**Output:**
- Backend: `Server listening on port 5000`
- Frontend: `Local: http://localhost:5173/`

### Option 2: Start Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## Available Commands

### Root Directory:
- `npm run dev` - Start both backend and frontend
- `npm run install:all` - Install all dependencies
- `npm run dev:server` - Start only backend
- `npm run dev:client` - Start only frontend

### Backend (`server/`):
- `npm run dev` - Start with Nodemon (auto-reload)
- `npm run start` - Start in production mode
- `npm run verify-db` - Verify MongoDB connection

### Frontend (`client/`):
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Verify It's Working

### 1. Check Backend
Open: `http://localhost:5000/api/health`

**Expected:** `{"status":"ok","timestamp":"..."}`**

### 2. Check Frontend
Open: `http://localhost:5173`

**Expected:** Heimage Bot homepage with Login/Signup buttons

### 3. Test the Flow
1. Click "Sign up"
2. Create an account
3. Log in
4. Generate an image
5. Download the image

---

## Stopping the Application

Press `Ctrl + C` in the terminal where `npm run dev` is running.

This will stop both backend and frontend servers.

---

## Troubleshooting

### Issue: "Cannot find module 'concurrently'"
**Solution:**
```bash
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
1. Stop the existing server (Ctrl + C)
2. Or change PORT in `server/.env` to a different port
3. Update `CLIENT_URL` and `VITE_API_BASE_URL` accordingly

### Issue: "MongoDB connection error"
**Solution:**
1. Check your `MONGO_URI` in `server/.env`
2. Make sure MongoDB is accessible
3. Verify your MongoDB connection string is correct

### Issue: "Network Error"
**Solution:**
1. Make sure backend is running
2. Check `VITE_API_BASE_URL` in `client/.env`
3. Verify backend is accessible: `http://localhost:5000/api/health`

---

## Quick Reference

```bash
# First time setup
npm run install:all

# Start everything
npm run dev

# Open browser
http://localhost:5173
```

---

That's it! Your app should be running now! 🎉

Need help? Check `README.md` or `START_HERE.md` for more details.

