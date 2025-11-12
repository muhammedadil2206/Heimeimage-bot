# 🔧 Fix 404 Error - Cannot Connect to Server

## Problem

You're getting this error:
```
Cannot connect to server: Server error: 404. Please make sure the backend is running on port 5000.
```

## Cause

The frontend is trying to connect to `http://localhost:5000/api` instead of your Vercel backend URL.

## Solution

### Step 1: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Frontend Project** (`heimage-bot-frontend`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add Environment Variable**
5. Add:
   ```
   Key: VITE_API_BASE_URL
   Value: https://heimage-bot-backend.vercel.app/api
   ```
   **Important:** Replace `heimage-bot-backend.vercel.app` with your actual backend URL!
6. Click **Save**
7. Redeploy (Vercel will automatically redeploy)

### Step 2: Verify Backend URL

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Backend Project** (`heimage-bot-backend`)
3. Note your backend URL (e.g., `https://heimage-bot-backend.vercel.app`)
4. Test health check: `https://heimage-bot-backend.vercel.app/api/health`
5. Should return: `{"status":"ok","timestamp":"..."}`

### Step 3: Update Frontend Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Frontend Project** (`heimage-bot-frontend`)
3. Go to **Settings** → **Environment Variables**
4. Update `VITE_API_BASE_URL` to:
   ```
   https://your-backend-url.vercel.app/api
   ```
   **Important:** 
   - Replace `your-backend-url.vercel.app` with your actual backend URL
   - Include `/api` at the end
   - Use HTTPS (not HTTP)
5. Click **Save**
6. Redeploy (Vercel will automatically redeploy)

### Step 4: Verify Frontend URL

1. Go to your frontend URL: `https://heimage-bot-frontend.vercel.app`
2. Open browser console (F12)
3. Check console logs for:
   ```
   API Base URL: https://heimage-bot-backend.vercel.app/api
   ```
4. If you see `http://localhost:5000/api`, the environment variable is not set correctly!

---

## Quick Fix

### For Vercel Frontend:

1. **Go to Vercel Dashboard** → Frontend Project → Settings → Environment Variables
2. **Add/Update:**
   ```
   VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app/api
   ```
3. **Replace** `heimage-bot-backend.vercel.app` with your actual backend URL
4. **Save** and redeploy (Vercel will automatically redeploy)

---

## Verification

### Check Backend is Running:

```bash
# Test health check
curl https://heimage-bot-backend.vercel.app/api/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

### Check Frontend Configuration:

1. Open your frontend URL in browser
2. Open browser console (F12)
3. Look for: `API Base URL: https://...`
4. Should show your Vercel backend URL, not `localhost:5000`

---

## Common Mistakes

### ❌ Wrong Environment Variable

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### ✅ Correct Environment Variable

```
VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app/api
```

### ❌ Missing `/api`

```
VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app
```

### ✅ Includes `/api`

```
VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app/api
```

### ❌ Using HTTP instead of HTTPS

```
VITE_API_BASE_URL=http://heimage-bot-backend.vercel.app/api
```

### ✅ Using HTTPS

```
VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app/api
```

---

## Troubleshooting

### Issue: Environment Variable Not Working

**Solution:**
1. Check if variable is set in Vercel Dashboard
2. Verify variable name is exactly `VITE_API_BASE_URL`
3. Check if frontend is redeployed after adding variable
4. Clear browser cache and reload
5. Check browser console for API Base URL

### Issue: Backend Returns 404

**Solution:**
1. Check if backend is running: `https://your-backend.vercel.app/api/health`
2. Verify backend URL is correct
3. Check if `/api` is included in the URL
4. Verify backend routes are correct
5. Check backend logs in Vercel Dashboard

### Issue: CORS Error

**Solution:**
1. Check if `CLIENT_URL` is set in backend environment variables
2. Verify `CLIENT_URL` matches your frontend URL
3. Check backend CORS configuration
4. Verify both URLs use HTTPS

---

## Summary

**Problem:** Frontend is pointing to `localhost:5000` instead of Vercel backend

**Solution:** Set `VITE_API_BASE_URL` environment variable in Vercel to your backend URL

**Format:** `https://your-backend-url.vercel.app/api`

---

That's it! Set the environment variable and redeploy! 🚀

