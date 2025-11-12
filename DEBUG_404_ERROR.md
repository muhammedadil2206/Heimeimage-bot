# 🔍 Debug 404 Error - Backend Connection

## Problem

Getting 404 error when trying to connect to backend:
```
Cannot connect to server: Server error: 404. Please check if the backend is running at heimage-bot-backend.onrender.com/api
```

## Possible Causes

1. **Backend not deployed/running**
2. **Backend URL incorrect (missing https://)**
3. **Backend routes not configured correctly**
4. **Health endpoint doesn't exist**
5. **CORS issue**

## Step-by-Step Debugging

### Step 1: Verify Backend is Running

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Backend Project** (`heimage-bot-backend`)
3. Check **Deployments** - should show **Ready**
4. Check **Logs** - should show:
   ```
   MongoDB connected (serverless)
   Environment: production
   ```

### Step 2: Test Backend Health Endpoint

1. Open your browser
2. Go to: `https://heimage-bot-backend.vercel.app/api/health`
3. Should return: `{"status":"ok","timestamp":"..."}`
4. If you get 404, the backend might not be running or routes are misconfigured

### Step 3: Check Backend URL Format

**In Vercel Dashboard:**
- Backend URL should be: `https://heimage-bot-backend.vercel.app`
- Note: Vercel automatically adds `https://`

**In Frontend Environment Variable:**
```
VITE_API_BASE_URL=https://heimage-bot-backend.vercel.app/api
```

**Important:**
- Must include `https://`
- Must include `/api` at the end
- No trailing slash after `/api`

### Step 4: Verify Backend Routes

Check if backend routes are configured correctly:

1. **Health endpoint:** `/api/health` ✅
2. **Auth routes:** `/api/auth/signup`, `/api/auth/login` ✅
3. **Image routes:** `/api/image/generate` ✅
4. **History routes:** `/api/history` ✅

### Step 5: Check Backend Logs

1. Go to Render Dashboard → Backend Service → Logs
2. Look for errors:
   - MongoDB connection errors
   - Route errors
   - Port errors
   - Environment variable errors

### Step 6: Check Frontend Environment Variable

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Check `VITE_API_BASE_URL`:
   - Should be: `https://heimage-bot-backend.vercel.app/api`
   - Should NOT be: `http://localhost:5000/api`
   - Should NOT be: `heimage-bot-backend.vercel.app/api` (missing https://)
   - Should NOT be: `https://heimage-bot-backend.vercel.app` (missing /api)

### Step 7: Check Browser Console

1. Open your frontend URL
2. Open browser console (F12)
3. Look for:
   ```
   API Base URL: https://heimage-bot-backend.onrender.com/api
   ```
4. If you see `http://localhost:5000/api`, the environment variable is not set
5. If you see `heimage-bot-backend.onrender.com/api` (without https://), the URL format is wrong

---

## Common Issues and Fixes

### Issue 1: Backend Not Running

**Symptoms:**
- 404 error
- Backend deployment shows "Failed" or "Error"

**Solution:**
1. Check backend logs in Vercel Dashboard
2. Verify all environment variables are set
3. Check if build succeeded
4. Redeploy backend

### Issue 2: Wrong Backend URL

**Symptoms:**
- 404 error
- URL shows `heimage-bot-backend.vercel.app/api` (missing https://)

**Solution:**
1. Update `VITE_API_BASE_URL` in Vercel:
   ```
   https://heimage-bot-backend.vercel.app/api
   ```
2. Make sure to include `https://`
3. Make sure to include `/api`
4. Save and redeploy (Vercel will automatically redeploy)

### Issue 3: Backend Routes Not Working

**Symptoms:**
- 404 error on all endpoints
- Health endpoint doesn't work

**Solution:**
1. Check backend `server.js` file
2. Verify routes are registered:
   ```javascript
   app.use('/api/auth', authRoutes);
   app.use('/api/image', imageRoutes);
   app.use('/api/history', historyRoutes);
   ```
3. Verify health endpoint exists:
   ```javascript
   app.get('/api/health', (_, res) => {
     res.json({ status: 'ok', timestamp: new Date().toISOString() });
   });
   ```

### Issue 4: CORS Error

**Symptoms:**
- CORS error in browser console
- 404 or network error

**Solution:**
1. Check backend `CLIENT_URL` environment variable
2. Should be: `https://heimage-bot-frontend.vercel.app`
3. Update in Vercel Dashboard → Backend Project → Settings → Environment Variables
4. Save and redeploy (Vercel will automatically redeploy)

### Issue 5: Environment Variable Not Set

**Symptoms:**
- Frontend still uses `localhost:5000`
- Browser console shows wrong API URL

**Solution:**
1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Add `VITE_API_BASE_URL`:
   ```
   https://heimage-bot-backend.vercel.app/api
   ```
3. Save and redeploy (Vercel will automatically redeploy)
4. Clear browser cache
5. Reload page

---

## Quick Fix Checklist

- [ ] Backend is running (Status: Live)
- [ ] Backend health check works: `https://heimage-bot-backend.onrender.com/api/health`
- [ ] Backend URL is correct: `https://heimage-bot-backend.onrender.com`
- [ ] Frontend environment variable is set: `VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api`
- [ ] Environment variable includes `https://`
- [ ] Environment variable includes `/api`
- [ ] Frontend is redeployed after adding environment variable
- [ ] Browser console shows correct API URL
- [ ] CORS is configured correctly in backend
- [ ] Backend `CLIENT_URL` matches frontend URL

---

## Test Backend Manually

### Test 1: Health Check

```bash
curl https://heimage-bot-backend.vercel.app/api/health
```

**Expected:** `{"status":"ok","timestamp":"..."}`

### Test 2: Signup Endpoint

```bash
curl -X POST https://heimage-bot-backend.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

**Expected:** `{"message":"Account created successfully","token":"...","user":{...}}`

### Test 3: Check Backend Logs

1. Go to Vercel Dashboard → Backend Project → Deployments → Logs
2. Look for:
   - Server startup messages
   - MongoDB connection messages
   - Route registration messages
   - Error messages

---

## Debug Steps

### Step 1: Check Backend Status

1. Go to Vercel Dashboard
2. Click on Backend Project
3. Check Deployments - should be **Ready**
4. Check Last Deployed - should be recent

### Step 2: Check Backend Logs

1. Go to Vercel Dashboard → Backend Project → Deployments → Logs
2. Look for:
   ```
   MongoDB connected (serverless)
   Environment: production
   ```
3. If you see errors, fix them first

### Step 3: Test Backend URL

1. Open browser
2. Go to: `https://heimage-bot-backend.vercel.app/api/health`
3. Should return JSON: `{"status":"ok","timestamp":"..."}`
4. If 404, backend routes might not be configured correctly

### Step 4: Check Frontend Environment Variable

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Check `VITE_API_BASE_URL`
3. Should be: `https://heimage-bot-backend.vercel.app/api`
4. Update if incorrect

### Step 5: Check Browser Console

1. Open frontend URL
2. Open browser console (F12)
3. Look for API Base URL
4. Should show: `https://heimage-bot-backend.vercel.app/api`
5. If wrong, update environment variable

---

## Summary

**Problem:** 404 error when connecting to backend

**Possible Causes:**
1. Backend not deployed/running
2. Wrong backend URL (missing https://)
3. Backend routes not configured
4. Environment variable not set
5. CORS issue

**Solution:**
1. Verify backend is deployed on Vercel
2. Test backend health endpoint
3. Check backend URL format
4. Set frontend environment variable correctly in Vercel
5. Check CORS settings
6. Check browser console for errors

---

That's it! Follow these steps to debug the 404 error! 🚀

