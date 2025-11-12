# 🚀 Render Deployment Guide - Heimage Bot Backend

Complete step-by-step guide to deploy your backend on Render.

---

## 📋 Prerequisites

1. ✅ GitHub account with your code pushed
2. ✅ Render account (sign up at [render.com](https://render.com))
3. ✅ MongoDB Atlas account (or your MongoDB connection string)
4. ✅ Clipdrop API key

---

## 🛠️ STEP 1: Verify Project Structure

Your project should have this structure:

```
Heimage bot/
├── client/          # React frontend (we'll deploy this separately)
├── server/          # Express backend (deploying to Render)
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── render.yaml      # Render configuration (already created)
└── package.json
```

✅ **Already Done:** `render.yaml` file has been created at the root.

---

## ⚙️ STEP 2: Verify server/package.json

Your `server/package.json` should have:

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.19.3",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^3.0.3",
    "axios": "^1.13.2",
    "form-data": "^4.0.0",
    "helmet": "^8.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^8.2.1",
    "dotenv": "^17.2.3"
  }
}
```

✅ **Status:** Your package.json is correct!

---

## 🔐 STEP 3: Set Up MongoDB Atlas

### 3.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create account
3. Click **"Create"** → **"Cluster"**
4. Choose **FREE** tier (M0)
5. Select a cloud provider and region (closest to you)
6. Name your cluster: `heimeimage` (or any name)
7. Click **"Create Cluster"** (takes 3-5 minutes)

### 3.2 Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `heimage_user` (or your choice)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 3.3 Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ For production, you can restrict to Render IPs later
4. Click **"Confirm"**

### 3.4 Get Connection String

1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string:
   ```
   mongodb+srv://heimage_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT:** Replace `<password>` with your actual password
7. **IMPORTANT:** Add database name at the end:
   ```
   mongodb+srv://heimage_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/heimeimage?retryWrites=true&w=majority
   ```
   - Add `/heimeimage` before the `?` (this is your database name)

### 3.5 Test Connection (Optional)

You can test the connection string locally:
```bash
cd server
node scripts/verifyDB.js
```

---

## 🌍 STEP 4: Deploy Backend on Render

### 4.1 Push Code to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 4.2 Create Render Account

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Sign up or log in (can use GitHub to sign in)

### 4.3 Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### 4.4 Connect GitHub Repository

1. Click **"Connect account"** if not connected
2. Authorize Render to access your GitHub
3. Select your repository: `Heimage bot` (or your repo name)
4. Click **"Connect"**

### 4.5 Configure Service Settings

Fill in the following:

**Name:**
```
heimage-bot-backend
```

**Region:**
```
Choose closest to you (e.g., Oregon, Frankfurt)
```

**Branch:**
```
main (or your default branch)
```

**Root Directory:**
```
server
```
⚠️ **Important:** This tells Render to look in the `server/` folder

**Runtime:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:**
```
Free (or choose a paid plan for better performance)
```

### 4.6 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

#### Required Variables:

1. **NODE_ENV**
   ```
   production
   ```

2. **PORT**
   ```
   5000
   ```
   (Render will override this, but set it anyway)

3. **MONGO_URI**
   ```
   mongodb+srv://heimage_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/heimeimage?retryWrites=true&w=majority
   ```
   ⚠️ Replace with your actual connection string from Step 3.4

4. **JWT_SECRET**
   ```
   your_random_secret_key_minimum_32_characters_long
   ```
   ⚠️ Generate a strong random string (32+ characters)
   - You can use: `openssl rand -base64 32` (in terminal)
   - Or use an online generator

5. **CLIPDROP_API_KEY**
   ```
   your_clipdrop_api_key_here
   ```
   ⚠️ Your Clipdrop API key

6. **CLIENT_URL**
   ```
   https://your-frontend-url.vercel.app
   ```
   ⚠️ **Leave this for now** - we'll update it after deploying frontend
   - For now, you can set it to `*` temporarily: `*`

### 4.7 Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Watch the build logs (takes 2-5 minutes)
4. Wait for **"Your service is live"** message

### 4.8 Get Your Backend URL

After deployment, you'll see:
- **Service URL:** `https://heimage-bot-backend.onrender.com` (or similar)
- **Health Check:** `https://heimage-bot-backend.onrender.com/api/health`

---

## ✅ STEP 5: Verify Deployment

### 5.1 Test Health Endpoint

Open in browser or use curl:
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 5.2 Test Signup Endpoint

```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 5.3 Check Logs

1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab
4. Check for any errors
5. Look for: `✅ MongoDB connected`
6. Look for: `Server listening on port 5000`

---

## 🔧 STEP 6: Update CLIENT_URL (After Frontend Deployment)

Once you deploy the frontend (on Vercel), update the `CLIENT_URL`:

1. Go to Render Dashboard → Your Service
2. Click **"Environment"** tab
3. Find `CLIENT_URL`
4. Click **"Edit"**
5. Update to your frontend URL:
   ```
   https://your-frontend-app.vercel.app
   ```
6. Click **"Save Changes"**
7. Render will automatically redeploy

---

## 🚨 Troubleshooting

### Issue: Build Fails

**Solution:**
- Check build logs in Render dashboard
- Verify `server/package.json` has all dependencies
- Make sure `Root Directory` is set to `server`

### Issue: MongoDB Connection Failed

**Solution:**
1. Verify `MONGO_URI` is correct
2. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Verify database name is in connection string: `/heimeimage`
4. Check MongoDB Atlas cluster is running
5. Verify username and password are correct

### Issue: Service Crashes on Start

**Solution:**
1. Check logs for error messages
2. Verify all environment variables are set
3. Check `server.js` uses `process.env.PORT`
4. Verify MongoDB connection string format

### Issue: CORS Errors

**Solution:**
1. Update `CLIENT_URL` environment variable
2. Make sure frontend URL matches exactly
3. Include `https://` in the URL
4. Redeploy after updating

### Issue: Function Timeout

**Solution:**
- Render free tier has 15-minute timeout
- Image generation should complete within this time
- If timeout occurs, check Clipdrop API response time
- Consider upgrading to paid plan for longer timeouts

---

## 📊 Render Free Tier Limits

- **750 hours/month** (enough for 24/7 operation)
- **512 MB RAM**
- **0.1 CPU**
- **15-minute request timeout**
- **Automatic sleep after 15 minutes of inactivity** (free tier)
  - First request after sleep takes ~30 seconds (cold start)

### Upgrade Options

If you need:
- **No sleep:** Upgrade to Starter ($7/month)
- **More resources:** Choose higher tier
- **Better performance:** Paid plans have better specs

---

## 🔄 Auto-Deploy Settings

Render automatically deploys when you push to your connected branch:

1. Go to Render Dashboard → Your Service
2. Click **"Settings"**
3. Under **"Auto-Deploy"**, make sure it's enabled
4. Every `git push` will trigger a new deployment

---

## 📝 Environment Variables Summary

Here's what you need to set in Render:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Random 32+ char string | `abc123...` |
| `CLIPDROP_API_KEY` | Your Clipdrop API key | `a15c7390...` |
| `CLIENT_URL` | Your frontend URL | `https://...vercel.app` |

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (`0.0.0.0/0`)
- [ ] Connection string copied and formatted correctly
- [ ] Render account created
- [ ] Web service created on Render
- [ ] Root directory set to `server`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All environment variables set
- [ ] Service deployed successfully
- [ ] Health check endpoint works
- [ ] Test signup endpoint works
- [ ] Logs show no errors
- [ ] MongoDB connection successful

---

## 🎯 Next Steps

After backend is deployed:

1. ✅ **Note your backend URL:** `https://your-backend.onrender.com`
2. ✅ **Test all endpoints** to ensure they work
3. ✅ **Deploy frontend on Vercel** (separate guide)
4. ✅ **Update CLIENT_URL** in Render with frontend URL
5. ✅ **Update VITE_API_BASE_URL** in Vercel with backend URL
6. ✅ **Test the full application**

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Logs](https://render.com/docs/logs)

---

**Your backend is now live on Render! 🎉**

Next: Deploy the frontend on Vercel and connect everything together.

