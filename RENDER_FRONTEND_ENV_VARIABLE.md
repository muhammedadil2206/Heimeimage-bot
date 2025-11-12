# 🔐 Render Frontend Environment Variable Setup

## Problem

Frontend is showing 404 error because it's trying to connect to `localhost:5000` instead of your Render backend.

## Solution

Set the `VITE_API_BASE_URL` environment variable in Render.

---

## Step-by-Step Instructions

### Step 1: Get Your Backend URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Backend Service** (`heimage-bot-backend`)
3. Note your backend URL (e.g., `https://heimage-bot-backend.onrender.com`)
4. Test it: `https://heimage-bot-backend.onrender.com/api/health`
5. Should return: `{"status":"ok","timestamp":"..."}`

### Step 2: Set Environment Variable in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend Service** (`heimage-bot-frontend`)
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Enter:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://heimage-bot-backend.onrender.com/api`
   - **Important:** Replace `heimage-bot-backend.onrender.com` with your actual backend URL!
6. Click **Save Changes**
7. Wait for redeployment (2-3 minutes)

### Step 3: Verify Environment Variable

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend Service** (`heimage-bot-frontend`)
3. Go to **Environment** tab
4. Check if `VITE_API_BASE_URL` is listed
5. Verify the value is correct:
   ```
   https://your-backend-url.onrender.com/api
   ```

### Step 4: Test Frontend

1. Go to your frontend URL: `https://heimage-bot-frontend.onrender.com`
2. Open browser console (F12)
3. Look for: `API Base URL: https://...`
4. Should show your Render backend URL, not `localhost:5000`
5. Try to sign up or login
6. Should work without 404 errors

---

## Environment Variable Format

### ✅ Correct Format

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### ❌ Common Mistakes

```
# Wrong: Missing /api
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com

# Wrong: Using HTTP instead of HTTPS
VITE_API_BASE_URL=http://heimage-bot-backend.onrender.com/api

# Wrong: Using localhost
VITE_API_BASE_URL=http://localhost:5000/api

# Wrong: Missing https://
VITE_API_BASE_URL=heimage-bot-backend.onrender.com/api

# Wrong: Extra spaces
VITE_API_BASE_URL = https://heimage-bot-backend.onrender.com/api
```

---

## Important Notes

1. **Variable Name:** Must be exactly `VITE_API_BASE_URL` (case-sensitive)
2. **Value Format:** `https://your-backend-url.onrender.com/api`
3. **Include `/api`:** Always include `/api` at the end
4. **Use HTTPS:** Always use HTTPS, not HTTP
5. **No Quotes:** Don't add quotes around the value
6. **No Spaces:** No spaces around the `=` sign
7. **Redeploy:** Frontend will automatically redeploy after saving

---

## Verification Checklist

- [ ] Backend is running and accessible
- [ ] Backend health check works: `/api/health`
- [ ] Environment variable is set in Render
- [ ] Variable name is correct: `VITE_API_BASE_URL`
- [ ] Variable value is correct: `https://...onrender.com/api`
- [ ] Frontend is redeployed after adding variable
- [ ] Browser console shows correct API Base URL
- [ ] No 404 errors in browser console
- [ ] Signup/Login works
- [ ] Image generation works

---

## Troubleshooting

### Issue: Environment Variable Not Working

**Check:**
1. Variable is set in Render Dashboard
2. Variable name is exactly `VITE_API_BASE_URL`
3. Variable value is correct
4. Frontend is redeployed
5. Browser cache is cleared

**Fix:**
1. Update environment variable in Render
2. Save changes
3. Wait for redeployment
4. Clear browser cache
5. Reload page

### Issue: Still Getting 404

**Check:**
1. Backend URL is correct
2. Backend is running
3. Backend health check works
4. `/api` is included in URL
5. Using HTTPS, not HTTP

**Fix:**
1. Verify backend URL in Render Dashboard
2. Test backend health check
3. Update `VITE_API_BASE_URL` with correct URL
4. Redeploy frontend
5. Test again

### Issue: CORS Error

**Check:**
1. `CLIENT_URL` is set in backend
2. `CLIENT_URL` matches frontend URL
3. Both URLs use HTTPS

**Fix:**
1. Update `CLIENT_URL` in backend environment variables
2. Set to: `https://heimage-bot-frontend.onrender.com`
3. Save and wait for redeployment
4. Test again

---

## Quick Reference

### Frontend Environment Variable

```
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### Backend Environment Variable (for CORS)

```
CLIENT_URL=https://heimage-bot-frontend.onrender.com
```

### Test URLs

```
Backend Health: https://heimage-bot-backend.onrender.com/api/health
Frontend: https://heimage-bot-frontend.onrender.com
```

---

## Summary

**Problem:** Frontend trying to connect to `localhost:5000`

**Solution:** Set `VITE_API_BASE_URL` environment variable in Render

**Value:** `https://your-backend-url.onrender.com/api`

**Result:** Frontend connects to Render backend instead of localhost

---

That's it! Set the environment variable and your frontend will connect to your Render backend! 🚀

