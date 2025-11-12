# Render Deployment Guide for Heimage Bot

This guide will help you deploy your Heimage Bot application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. MongoDB database (MongoDB Atlas recommended)
3. Clipdrop API key

## Deployment Steps

### Step 1: Deploy Backend Service

1. Go to your Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `heimage-bot-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free (or choose a paid plan)

5. **Add Environment Variables** in Render Dashboard:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `your-mongodb-connection-string`
   - `JWT_SECRET` = `your-random-secret-string` (generate a strong random string)
   - `CLIPDROP_API_KEY` = `your-clipdrop-api-key`
   - `CLIENT_URL` = `https://heimage-bot-frontend.onrender.com` (update after frontend deploys)

6. Click "Create Web Service"
7. Wait for deployment to complete
8. **Copy the service URL** (e.g., `https://heimage-bot-backend.onrender.com`)

### Step 2: Deploy Frontend Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `heimage-bot-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd client && npm install && npm run build && npm install -g serve`
   - **Start Command**: `serve -s client/dist -l 10000`
   - **Plan**: Free (or choose a paid plan)

4. **Add Environment Variables**:
   - `VITE_API_BASE_URL` = `https://heimage-bot-backend.onrender.com/api` (use your actual backend URL from Step 1)

5. Click "Create Web Service"
6. Wait for deployment to complete
7. **Copy the frontend URL** (e.g., `https://heimage-bot-frontend.onrender.com`)

### Step 3: Update Environment Variables

After both services are deployed:

1. **Update Backend CLIENT_URL**:
   - Go to backend service → Environment
   - Update `CLIENT_URL` to your frontend URL: `https://heimage-bot-frontend.onrender.com`

2. **Verify Frontend API URL**:
   - Go to frontend service → Environment
   - Verify `VITE_API_BASE_URL` points to: `https://heimage-bot-backend.onrender.com/api`

3. **Redeploy both services** (or they will auto-redeploy if auto-deploy is enabled)

## Alternative: Single Service Deployment (Backend serves Frontend)

If you prefer to deploy as a single service:

1. **Update `render.yaml`** - Keep only the backend service
2. **Add environment variable** to backend:
   - `SERVE_STATIC` = `true`
3. **Update build command** to:
   ```bash
   cd server && npm install && cd ../client && npm install && npm run build && cd ../server
   ```
4. **Update start command** to:
   ```bash
   cd server && npm start
   ```

The backend will serve the frontend static files automatically.

## Environment Variables Summary

### Backend Required Variables:
- `NODE_ENV` = `production`
- `MONGO_URI` = MongoDB connection string
- `JWT_SECRET` = Random secret for JWT tokens
- `CLIPDROP_API_KEY` = Your Clipdrop API key
- `CLIENT_URL` = Frontend URL (for CORS)

### Frontend Required Variables:
- `VITE_API_BASE_URL` = Backend API URL (e.g., `https://heimage-bot-backend.onrender.com/api`)

## Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: Verify `MONGO_URI` is correct and IP is whitelisted in MongoDB Atlas
- **CORS Errors**: Ensure `CLIENT_URL` matches your frontend URL exactly
- **Port Issues**: Render automatically sets `PORT`, don't override it

### Frontend Issues:
- **API Connection Errors**: Verify `VITE_API_BASE_URL` is correct and backend is running
- **Build Errors**: Check that all dependencies are in `package.json`

### General:
- Check Render logs for detailed error messages
- Ensure all environment variables are set correctly
- Free tier services spin down after 15 minutes of inactivity (first request may be slow)

## Testing Your Deployment

1. Visit your frontend URL
2. Try signing up/logging in
3. Generate an image
4. Check backend logs in Render Dashboard for any errors

## Notes

- Free tier services may take 30-60 seconds to start if they've been idle
- Consider upgrading to a paid plan for better performance
- Monitor your Render dashboard for service health

