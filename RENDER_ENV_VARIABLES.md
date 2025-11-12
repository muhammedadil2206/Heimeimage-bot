# 🔐 Render Environment Variables

## Backend Environment Variables (Render)

Set these in Render Dashboard → Your Backend Service → Environment

### Required Variables

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_minimum_32_characters_long
CLIPDROP_API_KEY=a15c73908e434ac03862a8553fdf272e95cbcf0c5b7fc584b4a61261a491247cf79aef81c334e277598943ce7351560e
CLIENT_URL=https://your-frontend-url.onrender.com
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render uses 10000) | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | `my_secret_key_12345...` |
| `CLIPDROP_API_KEY` | Clipdrop API key | `a15c73908e434ac...` |
| `CLIENT_URL` | Frontend URL (for CORS) | `https://your-app.onrender.com` |

### Important Notes

1. **Replace `<YOUR_PASSWORD>`** with your actual MongoDB password
2. **JWT_SECRET** should be at least 32 characters long
3. **CLIENT_URL** should be your frontend URL (no trailing slash)
4. **No quotes** around values in Render
5. **No spaces** around `=` sign

---

## Frontend Environment Variables (Render/Vercel)

Set these in Render Dashboard → Your Frontend Service → Environment (or Vercel → Project Settings → Environment Variables)

### Required Variables

```env
VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://heimage-bot-backend.onrender.com/api` |

### Important Notes

1. **Replace `heimage-bot-backend.onrender.com`** with your actual backend URL
2. **Include `/api`** at the end
3. **Use HTTPS** (not HTTP)
4. **No trailing slash** at the end

---

## How to Set Environment Variables in Render

### Step 1: Go to Your Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your service (backend or frontend)

### Step 2: Open Environment Tab

1. Click on **Environment** tab
2. You'll see a list of environment variables

### Step 3: Add/Edit Variables

1. Click **Add Environment Variable**
2. Enter **Key** and **Value**
3. Click **Save Changes**
4. Service will automatically redeploy

### Step 4: Verify Variables

1. Check **Logs** tab to verify variables are loaded
2. Look for: `=== Environment Variables Check ===`
3. Verify all variables show as "Set"

---

## Environment Variables Checklist

### Backend (Render)

- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...`
- [ ] `JWT_SECRET=your_random_secret_key_32_chars_min`
- [ ] `CLIPDROP_API_KEY=your_clipdrop_api_key`
- [ ] `CLIENT_URL=https://your-frontend-url.onrender.com`

### Frontend (Render/Vercel)

- [ ] `VITE_API_BASE_URL=https://heimage-bot-backend.onrender.com/api`

---

## Troubleshooting

### Issue: Environment Variables Not Working

**Solution:**
1. Check if variables are set in Render Dashboard
2. Verify variable names are correct (case-sensitive)
3. Check for typos in values
4. Restart service after adding variables
5. Check logs for errors

### Issue: Backend Can't Connect to MongoDB

**Solution:**
1. Verify `MONGO_URI` is correct
2. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Verify database name is `heimeimage`
4. Check user permissions in MongoDB Atlas

### Issue: CORS Errors

**Solution:**
1. Verify `CLIENT_URL` is set correctly
2. Check if frontend URL matches `CLIENT_URL`
3. Verify CORS is configured in backend
4. Check if both URLs use HTTPS

---

## Security Best Practices

1. **Never commit .env files** to GitHub
2. **Use strong JWT_SECRET** (32+ characters, random)
3. **Use HTTPS** for all URLs
4. **Restrict MongoDB IP** whitelist (if possible)
5. **Use environment variables** for all secrets
6. **Rotate secrets** regularly
7. **Monitor logs** for security issues

---

## Quick Reference

### Backend URL Format
```
https://heimage-bot-backend.onrender.com
```

### Frontend URL Format
```
https://heimage-bot-frontend.onrender.com
```

### API Base URL Format
```
https://heimage-bot-backend.onrender.com/api
```

### MongoDB Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/heimeimage?retryWrites=true&w=majority
```

---

That's it! Your environment variables are now configured for Render deployment! 🎉

