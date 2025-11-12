## Heimage Bot

Heimage Bot is a full-stack text-to-image generator that pairs a modern React/Tailwind UI with a secure Express API that proxies the Clipdrop text-to-image service. Users can sign up, log in, generate stylised images, and browse/download their prompt history.

### Stack
- **Frontend:** Vite + React, Tailwind CSS, Framer Motion, React Router, React Hot Toast, Axios
- **Backend:** Node.js, Express 5, Mongoose, JWT, bcrypt, Helmet, CORS, express-rate-limit, Axios
- **Database:** MongoDB (Atlas or self-hosted)
- **AI Provider:** Clipdrop Text-to-Image API

### Monorepo Structure
```
Heimage bot/
├── client/   # React frontend
└── server/   # Express backend
```

---

## 1. Prerequisites
- Node.js 18+ (tested with v22) and npm 10+
- MongoDB connection string
- Clipdrop API key ([docs](https://clipdrop.co/apis/docs))

---

## 2. Environment Variables

Copy the provided examples and fill in your values:

```bash
cd server
copy env.example .env   # Windows PowerShell
# or: cp env.example .env
```

`server/.env`
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=super_secret_jwt_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=http://localhost:5173
```

```bash
cd ../client
copy env.example .env   # Windows PowerShell
# or: cp env.example .env
```

`client/.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 3. Install Dependencies
From the project root:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

---

## 4. Local Development

Start the backend and frontend in separate terminals.

```bash
# Terminal 1 – backend
cd server
npm run dev

# Terminal 2 – frontend
cd client
npm run dev
```

- API will run on `http://localhost:5000`
- Vite dev server will run on `http://localhost:5173`

When authenticated, the frontend stores the JWT and user info in `localStorage` and sends the token with every API call.

---

## 5. Backend API Reference

| Method | Endpoint              | Auth | Description                         |
|--------|-----------------------|------|-------------------------------------|
| POST   | `/api/auth/signup`    | ❌   | Register a new user                 |
| POST   | `/api/auth/login`     | ❌   | Log in and receive a JWT            |
| POST   | `/api/image/generate` | ✅   | Generate image via Clipdrop proxy   |
| GET    | `/api/history`        | ✅   | Fetch authenticated user history    |
| GET    | `/api/health`         | ❌   | Health check                        |

Protected routes require an `Authorization: Bearer <token>` header.

Prompt history is stored per user (latest 20 entries) with `prompt`, `style`, `imageUrl`, and timestamps.

---

## 6. Deployment to Render

### Backend Deployment

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Create New Web Service:**
   - Connect GitHub repository: `muhammedadil2206/Heimeimage-bot`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
   JWT_SECRET=your_random_secret_key_32_chars_min
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

4. **Health Check Path:** `/api/health`

### Frontend Deployment

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Create New Static Site:**
   - Connect GitHub repository: `muhammedadil2206/Heimeimage-bot`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```

### After Deployment

1. **Update Backend CLIENT_URL** with your frontend URL
2. **Update MongoDB Atlas IP Whitelist** to include `0.0.0.0/0`
3. **Test deployment** by accessing your frontend URL

### Detailed Deployment Guide

See `DEPLOY_TO_RENDER_STEP_BY_STEP.md` for detailed step-by-step instructions.

### Environment Variables Reference

See `RENDER_ENV_VARIABLES.md` for complete environment variables documentation.

---

## 7. Testing the Flow
1. Sign up a new account.
2. Log in and open the generator.
3. Enter a prompt, choose a style, and generate the image.
4. Download the result and confirm the prompt appears in the history grid.

---

## 8. Scripts

### Backend (`server/`)
- `npm run dev` – start with Nodemon
- `npm run start` – start in production mode

### Frontend (`client/`)
- `npm run dev` – Vite development server
- `npm run build` – production build
- `npm run preview` – preview built assets
- `npm run lint` – run ESLint

---

## 9. Troubleshooting

### Common Issues

**"Invalid or expired token"**
- Clear localStorage: Open browser console (F12) and run: `localStorage.removeItem('heimage_auth'); location.reload();`
- Make sure JWT_SECRET is set in `server/.env`
- Restart backend server
- Log in again

**"Network Error"**
- Check if backend server is running (Terminal 1)
- Verify backend is accessible: `http://localhost:5000/api/health`
- Check browser console (F12) for detailed errors
- Check backend console for error messages

**"Cannot connect to server"**
- Make sure backend is running on port 5000
- Check if port 5000 is already in use
- Verify CLIENT_URL in `server/.env` matches frontend URL

**"Image generation fails"**
- Check CLIPDROP_API_KEY in `server/.env`
- Verify API key is correct and has credits
- Check backend console for Clipdrop API errors
- Restart backend after changing `.env`

For more troubleshooting, see `FIX_TOKEN_ERROR.md` and `START_HERE.md`.

---

## 10. Deployment

### Backend Deployment (Render/Fly/Heroku)

1. **Set Environment Variables:**
   ```
   PORT=5000
   MONGO_URI=your_production_mongo_uri
   JWT_SECRET=your_production_jwt_secret
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLIENT_URL=https://your-frontend-domain.com
   ```

2. **Build Command:** `npm install`
3. **Start Command:** `npm run start`
4. **Node Version:** 18+

### Frontend Deployment (Vercel/Netlify)

1. **Set Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```

2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Node Version:** 18+

### Important Notes

- Remove test routes (`/api/test/test-clipdrop`) in production
- Use HTTPS in production
- Set secure JWT_SECRET (long, random string)
- Configure CORS with production frontend URL
- Use production MongoDB database
- Monitor API rate limits

---

## 11. Next Steps (Ideas)
- Add pagination/filtering for prompt history
- Offer additional Clipdrop parameters (aspect ratio, guidance scale)
- Persist generated images to object storage (S3, Cloudinary) instead of base64
- Add social sharing or community gallery
- Add user profiles
- Add image favorites
- Add search functionality

---

## 12. Project Status

✅ **All features implemented and working!**
- User authentication ✅
- Image generation ✅
- Prompt history ✅
- Download functionality ✅
- Error handling ✅
- Responsive UI ✅

See `PROJECT_STATUS.md` for detailed status.

---

Enjoy building with Heimage Bot! 🎨🤖

