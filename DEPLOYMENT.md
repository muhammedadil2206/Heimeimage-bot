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

## Backend Deployment

### Option 1: Render

1. **Create New Web Service**
   - Connect your GitHub repository
   - Select "Node" as environment
   - Set root directory: `server`

2. **Environment Variables:**
   ```
   PORT=5000
   MONGO_URI=your_production_mongo_uri
   JWT_SECRET=your_production_jwt_secret_min_32_chars
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLIENT_URL=https://your-frontend-domain.com
   NODE_ENV=production
   ```

3. **Build Settings:**
   - Build Command: `npm install`
   - Start Command: `npm run start`

4. **Advanced Settings:**
   - Node Version: 18+
   - Auto-Deploy: Yes

### Option 2: Fly.io

1. **Install Fly CLI:**
   ```bash
   npm install -g @fly/cli
   ```

2. **Create fly.toml:**
   ```toml
   app = "heimage-bot-backend"
   primary_region = "iad"
   
   [build]
   
   [http_service]
     internal_port = 5000
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
   
   [[services]]
     protocol = "tcp"
     internal_port = 5000
   ```

3. **Deploy:**
   ```bash
   cd server
   fly deploy
   ```

4. **Set Secrets:**
   ```bash
   fly secrets set MONGO_URI=your_mongo_uri
   fly secrets set JWT_SECRET=your_jwt_secret
   fly secrets set CLIPDROP_API_KEY=your_api_key
   fly secrets set CLIENT_URL=https://your-frontend-domain.com
   ```

### Option 3: Heroku

1. **Create Heroku App:**
   ```bash
   heroku create heimage-bot-backend
   ```

2. **Set Environment Variables:**
   ```bash
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLIPDROP_API_KEY=your_api_key
   heroku config:set CLIENT_URL=https://your-frontend-domain.com
   heroku config:set NODE_ENV=production
   ```

3. **Deploy:**
   ```bash
   cd server
   git push heroku main
   ```

---

## Frontend Deployment

### Option 1: Vercel

1. **Connect Repository:**
   - Import your GitHub repository
   - Set root directory: `client`

2. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```

3. **Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Connect Repository:**
   - Import your GitHub repository
   - Set base directory: `client`

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     ```
     VITE_API_BASE_URL=https://your-backend-domain.com/api
     ```

3. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete
   - Your app will be live at `https://your-app.netlify.app`

### Option 3: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build:**
   ```bash
   cd client
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

## Production Configuration

### Remove Test Routes

Before deploying, remove or comment out the test route:

**server/server.js:**
```javascript
// Remove this line in production:
// app.use('/api/test', testRoutes);
```

**server/routes/testRoutes.js:**
- Delete this file or don't import it in production

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

**Backend Production (.env):**
```
PORT=5000
MONGO_URI=your_production_mongo_uri
JWT_SECRET=your_secure_random_secret_min_32_chars
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=https://your-frontend-domain.com
NODE_ENV=production
```

**Frontend Production (.env):**
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

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

