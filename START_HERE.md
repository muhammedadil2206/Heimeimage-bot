# 🚀 Heimage Bot - Quick Start Guide

## Step-by-Step Setup and Run Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB connection string
- Clipdrop API key

---

## 📋 Setup (First Time Only)

### Step 1: Navigate to Project Directory
```bash
cd "C:\Users\gezar\OneDrive\Desktop\Heimage bot"
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../client
npm install
```

---

## 🔧 Environment Setup (First Time Only)

### Step 4: Create Backend .env File
```bash
cd ../server
```

Create a file named `.env` in the `server` folder with:
```
PORT=5000
MONGO_URI=your_mongo_connection_string_here
JWT_SECRET=your_random_secret_key_here
CLIPDROP_API_KEY=a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
CLIENT_URL=http://localhost:5173
```

**Important:**
- Replace `your_mongo_connection_string_here` with your actual MongoDB URI
- Replace `your_random_secret_key_here` with any random string (e.g., `my_secret_key_12345`)
- Make sure there are NO quotes around the values
- Make sure there are NO spaces around the `=` sign

### Step 5: Create Frontend .env File (Optional)
```bash
cd ../client
```

Create a file named `.env` in the `client` folder with:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** If you don't create this file, it will default to `http://localhost:5000/api`

---

## ▶️ Running the Application (Every Time)

You need **TWO separate terminals** - one for backend, one for frontend.

### Terminal 1: Backend Server
```bash
# Navigate to server directory
cd "C:\Users\gezar\OneDrive\Desktop\Heimage bot\server"

# Start the backend server
npm run dev
```

**Expected Output:**
```
=== Environment Variables Check ===
PORT: 5000 (default)
MONGO_URI: Set
JWT_SECRET: Set
CLIPDROP_API_KEY: Set (128 chars)
CLIENT_URL: http://localhost:5173
===================================
MongoDB connected: ...
Server listening on port 5000
Environment: development
```

**✅ Keep this terminal open!** The server must stay running.

---

### Terminal 2: Frontend Server
```bash
# Navigate to client directory
cd "C:\Users\gezar\OneDrive\Desktop\Heimage bot\client"

# Start the frontend server
npm run dev
```

**Expected Output:**
```
  VITE v7.2.2  ready in 1422 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**✅ Keep this terminal open!** The frontend must stay running.

---

## 🌐 Access the Application

1. Open your browser
2. Go to: `http://localhost:5173`
3. You should see the Heimage Bot homepage

---

## 🧪 Verify Everything Works

### Test 1: Backend Health Check
Open in browser: `http://localhost:5000/api/health`

**Expected:** `{"status":"ok","timestamp":"..."}`

### Test 2: Frontend
1. Go to `http://localhost:5173`
2. Click "Sign up" or "Login"
3. Create an account or log in
4. Try generating an image

---

## 🛑 Stopping the Servers

### To Stop Backend:
- In Terminal 1, press `Ctrl + C`
- Type `Y` if asked to confirm

### To Stop Frontend:
- In Terminal 2, press `Ctrl + C`
- Type `Y` if asked to confirm

---

## ❌ Troubleshooting

### Problem: "Cannot connect to server"
**Solution:** Make sure the backend server is running in Terminal 1

### Problem: "Port 5000 already in use"
**Solution:** 
1. Stop the existing server (Ctrl + C)
2. Or change PORT in `server/.env` to a different port (e.g., 5001)
3. Update `CLIENT_URL` in `server/.env` and `VITE_API_BASE_URL` in `client/.env`

### Problem: "MongoDB connection error"
**Solution:** 
1. Check your `MONGO_URI` in `server/.env`
2. Make sure MongoDB is accessible
3. Verify your MongoDB connection string is correct

### Problem: "Network Error" when generating images
**Solution:**
1. Check if backend is running (Terminal 1)
2. Check browser console (F12) for detailed error
3. Check backend console for error messages
4. Verify `CLIPDROP_API_KEY` is correct in `server/.env`
5. Restart backend server after changing `.env`

---

## 📝 Quick Command Reference

### Backend Commands
```bash
cd server
npm install          # Install dependencies (first time only)
npm run dev         # Start development server
npm run start       # Start production server
```

### Frontend Commands
```bash
cd client
npm install          # Install dependencies (first time only)
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## 🎯 Summary

**Every time you want to run the app:**

1. **Terminal 1:** `cd server` → `npm run dev`
2. **Terminal 2:** `cd client` → `npm run dev`
3. **Browser:** Go to `http://localhost:5173`

That's it! 🎉

