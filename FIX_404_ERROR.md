# 🔧 Fix 404 Error - Cannot Connect to Server

## Problem

You're getting this error:
```
Cannot connect to server: Server error: 404. Please make sure the backend is running on port 5000.
```

## Cause

The frontend is trying to connect to `http://localhost:5000/api` instead of your Render backend URL.

## Solution

### Step 1: Set Environment Variable in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend Service** (`heimage-bot-frontend`)
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add:
   ```
   Key: VITE_API_BASE_URL
   Value: https://heimage-bot-backend.onrender.com/api
   ```
   **Important:** Replace `heimage-bot-backend.onrender.com` with your actual backend URL!
6. Click **Save Changes**
7. Wait for redeployment (2-3 minutes)

### Step 2: Verify Backend URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Backend Service** (`heimage-bot-backend`)
3. Note your backend URL (e.g., `https://heimage-bot-backend.onrender.com`)
4. Test health check: `https://heimage-bot-backend.onrender.com/api/health`
5. Should return: `{"status":"ok","timestamp":"..."}`

### Step 3: Update Frontend Environment Variable

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend Service** (`heimage-bot-frontend`)
3. Go to **Environment** tab
4. Update `VITE_API_BASE_URL` to:
   ```
   https://your-backend-url.onrender.com/api
   ```
   **Important:** 
   - Replace `your-backend-url.onrender.com` with your actual backend URL
   - Include `/api` at the end
   - Use HTTPS (not HTTP)
5. Click **Save Changes**
6. Wait for redeployment

### Step 4: Verify Frontend URL

1. Go to your frontend URL: `https://heimage-bot-frontend.onrender.com`
2. Open browser console (F12)
3. Check console logs for:
   ```
   API Base URL: https://heimage-bot-backend.onrender.com/api
   ```
4. If you see `http://localhost:5000/api`, the environment variable is not set correctly!

---

## Quick Fix

### For Render Frontend:

1. **Go to Render Dashboard** → Frontend Service → Environment
2. **Add/Update:**
   ```
   VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
   ```
3. **Replace** `heimage-bot-backend.onrender.com` with your actual backend URL
4. **Save** and wait for redeployment

---

## Verification

### Check Backend is Running:

```bash
# Test health check
curl https://heimage-bot-backend.onrender.com/api/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

### Check Frontend Configuration:

1. Open your frontend URL in browser
2. Open browser console (F12)
3. Look for: `API Base URL: https://...`
4. Should show your Render backend URL, not `localhost:5000`

---

## Common Mistakes

### ❌ Wrong Environment Variable

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### ✅ Correct Environment Variable

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### ❌ Missing `/api`

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com
```

### ✅ Includes `/api`

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### ❌ Using HTTP instead of HTTPS

```
VITE_API_BASE_URL=http://heimage-bot-backend.onrender.com/api
```

### ✅ Using HTTPS

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

---

## Troubleshooting

### Issue: Environment Variable Not Working

**Solution:**
1. Check if variable is set in Render Dashboard
2. Verify variable name is exactly `VITE_API_BASE_URL`
3. Check if frontend is redeployed after adding variable
4. Clear browser cache and reload
5. Check browser console for API Base URL

### Issue: Backend Returns 404

**Solution:**
1. Check if backend is running: `https://your-backend.onrender.com/api/health`
2. Verify backend URL is correct
3. Check if `/api` is included in the URL
4. Verify backend routes are correct
5. Check backend logs in Render Dashboard

### Issue: CORS Error

**Solution:**
1. Check if `CLIENT_URL` is set in backend environment variables
2. Verify `CLIENT_URL` matches your frontend URL
3. Check backend CORS configuration
4. Verify both URLs use HTTPS

---

## Summary

**Problem:** Frontend is pointing to `localhost:5000` instead of Render backend

**Solution:** Set `VITE_API_BASE_URL` environment variable in Render to your backend URL

**Format:** `https://your-backend-url.onrender.com/api`

---

That's it! Set the environment variable and redeploy! 🚀

