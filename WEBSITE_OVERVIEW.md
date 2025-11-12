# 🎨 Heimage Bot - Complete Website Overview

## 📋 What This Website Has

### 🎯 Main Features

1. **User Authentication System**
   - User signup with name, email, and password
   - User login with email and password
   - Secure JWT token-based authentication
   - Automatic session management
   - Protected routes (requires login to access)

2. **Text-to-Image Generation**
   - Enter any text prompt
   - Choose from 5 styles: Realistic, Anime, Art, Cartoon, 3D
   - Generate images using Clipdrop AI API
   - View generated images instantly
   - Download generated images as PNG files
   - Loading states during generation

3. **Prompt History**
   - Automatically saves last 20 generated images per user
   - Displays history in a grid layout
   - Click any history item to regenerate/view
   - Shows prompt text and style for each entry
   - Timestamps for each generation

4. **Modern UI/UX**
   - Beautiful gradient background
   - Smooth animations (Framer Motion)
   - Responsive design (mobile, tablet, desktop)
   - Toast notifications for user feedback
   - Loading spinners
   - Error handling with user-friendly messages

---

## 🔌 How Everything Connects

### Architecture Diagram

```
┌─────────────────┐
│   React Frontend │  (Vite + React)
│   (client/)      │
│   Port: 5173     │
└────────┬─────────┘
         │
         │ HTTP Requests (Axios)
         │ JWT Token in Headers
         │
         ▼
┌─────────────────┐
│  Express Backend │  (Node.js + Express)
│   (server/)     │
│   Port: 5000    │
└────────┬─────────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   MongoDB    │  │  Clipdrop    │  │   JWT Auth   │
│   Database   │  │  API         │  │   System     │
│   (Atlas)    │  │  (External)  │  │   (Internal) │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Connection Flow

#### 1. **Frontend to Backend Connection**

**Technology:** Axios HTTP client

**Configuration:**
- Base URL: `http://localhost:5000/api` (development)
- Timeout: 120 seconds (for image generation)
- Headers: `Content-Type: application/json`
- Auth Header: `Authorization: Bearer <JWT_TOKEN>`

**How it works:**
- Frontend makes API calls to backend endpoints
- JWT token stored in `localStorage` as `heimage_auth`
- Token automatically added to request headers
- Interceptors handle errors and token expiration

**Example Flow:**
```
User clicks "Generate" 
  → Frontend calls POST /api/image/generate
  → Axios adds JWT token to headers
  → Request sent to backend
  → Backend validates token
  → Backend processes request
  → Response sent back to frontend
  → Frontend displays image
```

#### 2. **Backend to MongoDB Connection**

**Technology:** Mongoose ODM

**Configuration:**
- Connection String: `MONGO_URI` environment variable
- Database Name: `heimeimage`
- Collection: `users`
- Connection Pooling: Enabled

**How it works:**
- Backend connects to MongoDB on startup
- User data stored in `users` collection
- Each user document contains:
  - `name`, `email`, `password` (hashed)
  - `prompts[]` array (max 20 entries)
- Prompts stored with: `prompt`, `style`, `imageUrl`, `timestamps`

**Example Flow:**
```
User signs up
  → Backend receives signup request
  → Password hashed with bcrypt
  → User document created in MongoDB
  → JWT token generated
  → Token sent to frontend
```

#### 3. **Backend to Clipdrop API Connection**

**Technology:** Axios + FormData

**Configuration:**
- API URL: `https://clipdrop-api.co/text-to-image/v1`
- Method: POST
- Headers: `x-api-key: <CLIPDROP_API_KEY>`
- Content-Type: `multipart/form-data`
- Timeout: 60 seconds

**How it works:**
- Backend receives prompt and style from frontend
- Enhances prompt: `"{prompt}, {style} style"`
- Creates FormData with enhanced prompt
- Sends request to Clipdrop API
- Receives binary image data
- Converts to base64 string
- Returns base64 image URL to frontend

**Example Flow:**
```
User enters "cat" with "Anime" style
  → Backend receives: { prompt: "cat", style: "Anime" }
  → Backend enhances: "cat, anime style"
  → FormData created with enhanced prompt
  → Request sent to Clipdrop API
  → Clipdrop generates image
  → Binary image data received
  → Converted to base64: "data:image/png;base64,..."
  → Saved to user history in MongoDB
  → Base64 URL sent to frontend
  → Frontend displays image
```

#### 4. **Authentication Flow**

**Technology:** JWT (JSON Web Tokens)

**How it works:**
- User signs up/logs in
- Backend validates credentials
- JWT token generated with user ID
- Token sent to frontend
- Frontend stores token in `localStorage`
- Token included in all protected API requests
- Backend validates token on each request
- Token expires after 7 days (configurable)

**Example Flow:**
```
User logs in
  → Frontend sends: { email, password }
  → Backend validates credentials
  → JWT token created: { userId, email }
  → Token signed with JWT_SECRET
  → Token sent to frontend
  → Frontend stores in localStorage
  → All future requests include token
  → Backend middleware validates token
  → If valid: request proceeds
  → If invalid: 401 error, redirect to login
```

---

## 🔐 Security Connections

### 1. **Password Security**
- Passwords hashed with bcryptjs
- Never stored in plain text
- Minimum 6 characters required
- Not returned in API responses

### 2. **JWT Token Security**
- Tokens signed with secret key (`JWT_SECRET`)
- Tokens expire after set time
- Validated on every protected route
- Stored securely in localStorage

### 3. **CORS Protection**
- Backend only accepts requests from configured frontend URL
- Configured via `CLIENT_URL` environment variable
- Prevents unauthorized cross-origin requests

### 4. **Rate Limiting**
- 100 requests per minute per IP (production)
- Prevents abuse and DDoS attacks
- Applied to all `/api/*` routes

### 5. **Helmet Security**
- Security headers added to all responses
- Protects against common vulnerabilities
- Content Security Policy configured

---

## 📊 Data Flow Examples

### Example 1: User Signup Flow

```
1. User fills signup form (name, email, password)
2. Frontend: POST /api/auth/signup
3. Backend: Validates input
4. Backend: Checks if email exists in MongoDB
5. Backend: Hashes password with bcrypt
6. Backend: Creates user in MongoDB
7. Backend: Generates JWT token
8. Backend: Returns { token, user }
9. Frontend: Stores token in localStorage
10. Frontend: Redirects to home page
```

### Example 2: Image Generation Flow

```
1. User enters prompt: "sunset over mountains"
2. User selects style: "Realistic"
3. User clicks "Generate"
4. Frontend: POST /api/image/generate
   Headers: { Authorization: Bearer <token> }
   Body: { prompt: "sunset over mountains", style: "Realistic" }
5. Backend: Validates JWT token
6. Backend: Extracts user ID from token
7. Backend: Enhances prompt: "sunset over mountains, realistic style"
8. Backend: POST to Clipdrop API
   Headers: { x-api-key: <CLIPDROP_API_KEY> }
   Body: FormData with enhanced prompt
9. Clipdrop API: Generates image (10-60 seconds)
10. Clipdrop API: Returns binary image data
11. Backend: Converts binary to base64
12. Backend: Saves to user history in MongoDB
    - Adds to user.prompts array
    - Keeps only last 20 entries
13. Backend: Returns { imageUrl: "data:image/png;base64,..." }
14. Frontend: Displays image
15. Frontend: Refreshes history grid
```

### Example 3: History Retrieval Flow

```
1. User opens home page
2. Frontend: GET /api/history
   Headers: { Authorization: Bearer <token> }
3. Backend: Validates JWT token
4. Backend: Extracts user ID from token
5. Backend: Finds user in MongoDB
6. Backend: Returns user.prompts array (last 20)
7. Frontend: Displays prompts in grid
8. User clicks history item
9. Frontend: Sets current image to selected item
10. Frontend: Displays image and prompt
```

---

## 🛠️ Technology Stack Summary

### Frontend Stack
- **React 19.2.0** - UI framework
- **Vite 7.2.2** - Build tool and dev server
- **Tailwind CSS 3.4.14** - Styling
- **Framer Motion 12.23.24** - Animations
- **React Router 7.9.5** - Routing
- **Axios 1.13.2** - HTTP client
- **React Hot Toast 2.6.0** - Notifications

### Backend Stack
- **Node.js 18+** - Runtime
- **Express 5.1.0** - Web framework
- **Mongoose 8.19.3** - MongoDB ODM
- **JWT 9.0.2** - Authentication
- **bcryptjs 3.0.3** - Password hashing
- **Axios 1.13.2** - HTTP client
- **Helmet 8.1.0** - Security
- **CORS 2.8.5** - Cross-origin
- **express-rate-limit 8.2.1** - Rate limiting

### External Services
- **MongoDB Atlas** - Cloud database
- **Clipdrop API** - AI image generation

---

## 📁 Key Files and Their Roles

### Frontend Files
- `client/src/App.jsx` - Main app component, routing
- `client/src/pages/Home.jsx` - Main page with image generation
- `client/src/pages/Login.jsx` - Login page
- `client/src/pages/Signup.jsx` - Signup page
- `client/src/services/api.js` - Axios client configuration
- `client/src/services/imageService.js` - Image API calls
- `client/src/services/authService.js` - Auth API calls
- `client/src/context/AuthContext.jsx` - Auth state management

### Backend Files
- `server/server.js` - Main Express server
- `server/vercel.js` - Vercel serverless wrapper
- `server/controllers/imageController.js` - Image generation logic
- `server/controllers/authController.js` - Authentication logic
- `server/models/User.js` - User database model
- `server/config/db.js` - MongoDB connection
- `server/middleware/authMiddleware.js` - JWT validation
- `server/routes/*.js` - API route definitions

### Configuration Files
- `vercel.json` - Vercel deployment config
- `package.json` - Root dependencies
- `server/package.json` - Backend dependencies
- `client/package.json` - Frontend dependencies
- `.env` files - Environment variables (not in repo)

---

## 🔄 Request/Response Examples

### Signup Request
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Signup Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Image Generation Request
```http
POST /api/image/generate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "prompt": "cat playing piano",
  "style": "Anime"
}
```

### Image Generation Response
```json
{
  "message": "Image generated successfully",
  "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### History Request
```http
GET /api/history
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### History Response
```json
{
  "prompts": [
    {
      "prompt": "cat playing piano",
      "style": "Anime",
      "imageUrl": "data:image/png;base64,...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    ...
  ]
}
```

---

## ✅ What's Working

- ✅ User authentication (signup/login)
- ✅ JWT token management
- ✅ Image generation via Clipdrop API
- ✅ Prompt history storage and retrieval
- ✅ Image download functionality
- ✅ Error handling and validation
- ✅ Loading states
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Protected routes
- ✅ MongoDB integration
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Security headers

---

This is a complete, production-ready application with all features working correctly!

