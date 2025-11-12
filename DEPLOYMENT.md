# 🚀 Heimage Bot - Deployment Guide

## Production Deployment Checklist

### Before Deployment

- [ ] Remove test routes (`/api/test/test-clipdrop`)
- [ ] Set secure JWT_SECRET (long, random string)
- [ ] Use production MongoDB database
- [ ] Set production CLIENT_URL
- [ ] Configure CORS for production domain
- [ ] Use HTTPS in production
- [ ] Set up environment variables
- [ ] Test all features in production environment

---

## Backend Deployment (Vercel)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click:** "Add New..." → "Project"
3. **Connect GitHub:** `muhammedadil2206/Heimeimage-bot`
4. **Configure:**
   - **Root Directory:** `.` (root)
   - **Build Command:** `cd server && npm install`
   - **Output Directory:** EMPTY (leave empty)
   - **Framework Preset:** Other

5. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_URI=your_production_mongo_uri
   JWT_SECRET=your_production_jwt_secret_min_32_chars
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your backend will be live at `https://your-backend.vercel.app`

---

## Frontend Deployment (Vercel)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click:** "Add New..." → "Project"
3. **Connect GitHub:** `muhammedadil2206/Heimeimage-bot`
4. **Configure:**
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

---

## Production Configuration

### Test Routes

Test routes are automatically disabled in production:
- Test routes (`/api/test/*`) are only enabled in development
- In production (`NODE_ENV=production`), test routes are automatically disabled
- No manual removal needed

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT_SECRET (minimum 32 characters)
- [ ] Configure CORS with production frontend URL only
- [ ] Use production MongoDB database
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Use Helmet for security headers
- [ ] Monitor API usage and rate limits
- [ ] Set up error logging
- [ ] Set up monitoring/alerting

### Environment Variables

**Backend (Vercel):**
```
NODE_ENV=production
MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
JWT_SECRET=your_secure_random_secret_min_32_chars
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**Frontend (Vercel):**
```
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
```

**Important:** Set these in Vercel Dashboard → Settings → Environment Variables

---

## Post-Deployment

### Verify Deployment

1. **Backend Health Check:**
   - Visit: `https://your-backend-domain.com/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend:**
   - Visit: `https://your-frontend-domain.com`
   - Should load the application
   - Test signup/login
   - Test image generation
   - Test history

3. **API Endpoints:**
   - Test all endpoints
   - Verify authentication works
   - Verify image generation works
   - Verify history works

### Monitoring

- Set up error logging (Sentry, LogRocket, etc.)
- Monitor API usage
- Monitor Clipdrop API rate limits
- Monitor MongoDB connections
- Set up uptime monitoring
- Set up performance monitoring

---

## Troubleshooting Production Issues

### Backend Issues

**502 Bad Gateway:**
- Check if server is running
- Check server logs
- Verify environment variables
- Check MongoDB connection

**503 Service Unavailable:**
- Check if server is running
- Check server resources
- Verify database connection
- Check API rate limits

**CORS Errors:**
- Verify CLIENT_URL in backend .env
- Check CORS configuration
- Verify frontend URL matches CLIENT_URL

### Frontend Issues

**Cannot connect to API:**
- Verify VITE_API_BASE_URL in frontend .env
- Check if backend is accessible
- Verify CORS configuration
- Check network requests in browser console

**Authentication errors:**
- Verify JWT_SECRET is set correctly
- Check token expiration
- Verify token is being sent in requests
- Check backend logs for token errors

---

## Scaling Considerations

### Backend Scaling

- Use load balancer for multiple instances
- Use session storage (Redis) for JWT (if needed)
- Use CDN for static assets
- Use connection pooling for MongoDB
- Monitor API rate limits

### Frontend Scaling

- Use CDN for static assets
- Enable caching
- Use image optimization
- Monitor bundle size
- Use code splitting

---

## Backup & Recovery

### Database Backup

- Set up automated MongoDB backups
- Test backup restoration
- Monitor backup success
- Store backups securely

### Code Backup

- Use Git for version control
- Use GitHub/GitLab for remote backup
- Tag releases
- Document changes

---

## Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT_SECRET (32+ characters)**
3. **Use HTTPS in production**
4. **Configure CORS properly**
5. **Use rate limiting**
6. **Validate all inputs**
7. **Use Helmet for security headers**
8. **Monitor for security vulnerabilities**
9. **Keep dependencies updated**
10. **Use environment variables for secrets**

---

## Support & Maintenance

### Regular Maintenance

- Update dependencies regularly
- Monitor for security vulnerabilities
- Check API rate limits
- Monitor database performance
- Review error logs
- Test all features regularly

### Documentation

- Keep README updated
- Document API changes
- Document environment variables
- Document deployment process
- Document troubleshooting steps

---

## 🎉 Deployment Complete!

Your Heimage Bot is now live in production! 🚀

Enjoy your deployed application! 🎨🤖

