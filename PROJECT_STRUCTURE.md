# 📁 Heimage Bot - Complete Project Structure

```
Heimage bot/
│
├── 📄 README.md                    # Complete guide (local + deploy)
├── 📄 render.yaml                  # Render deployment config
├── 📄 run-dev.ps1                  # PowerShell script for Windows
├── 📄 package.json                 # Root package.json
├── 📄 package-lock.json
├── 📄 vercel.json                  # Vercel config (legacy)
│
├── 📂 client/                       # React Frontend
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 vite.config.js           # Vite configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS config
│   ├── 📄 postcss.config.js         # PostCSS config
│   ├── 📄 eslint.config.js          # ESLint config
│   ├── 📄 env.example              # Environment variables example
│   ├── 📄 index.html               # HTML entry point
│   │
│   ├── 📂 public/
│   │   └── vite.svg
│   │
│   ├── 📂 dist/                    # Build output (production)
│   │   ├── index.html
│   │   ├── vite.svg
│   │   └── assets/
│   │       ├── index-CkNGlqbt.js
│   │       └── index-DEY9VT_6.css
│   │
│   └── 📂 src/                     # Source code
│       ├── 📄 main.jsx             # React entry point
│       ├── 📄 App.jsx              # Main App component
│       ├── 📄 App.css              # App styles
│       ├── 📄 index.css            # Global styles
│       │
│       ├── 📂 components/          # React components
│       │   ├── Footer.jsx
│       │   ├── GeneratedImage.jsx
│       │   ├── Hero.jsx
│       │   ├── Loader.jsx
│       │   ├── Navbar.jsx
│       │   └── PromptHistory.jsx
│       │
│       ├── 📂 pages/               # Page components
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── Signup.jsx
│       │
│       ├── 📂 context/             # React Context
│       │   ├── AuthContext.jsx
│       │   └── AuthContextBase.js
│       │
│       ├── 📂 hooks/               # Custom hooks
│       │   └── useAuth.js
│       │
│       ├── 📂 services/            # API services
│       │   ├── api.js              # Axios client
│       │   ├── authService.js      # Auth API calls
│       │   └── imageService.js     # Image API calls
│       │
│       ├── 📂 utils/               # Utilities
│       │   └── apiHealth.js
│       │
│       ├── 📂 assets/              # Static assets
│       │   └── react.svg
│       │
│       └── 📂 styles/              # Additional styles
│
└── 📂 server/                       # Express Backend
    ├── 📄 server.js                 # Main server file
    ├── 📄 package.json
    ├── 📄 package-lock.json
    ├── 📄 vercel.js                 # Vercel serverless (legacy)
    │
    ├── 📂 config/                  # Configuration
    │   └── db.js                   # MongoDB connection
    │
    ├── 📂 controllers/             # Route controllers
    │   ├── authController.js       # Authentication logic
    │   ├── historyController.js     # History logic
    │   └── imageController.js      # Image generation logic
    │
    ├── 📂 routes/                   # Express routes
    │   ├── authRoutes.js           # Auth endpoints
    │   ├── historyRoutes.js        # History endpoints
    │   ├── imageRoutes.js          # Image endpoints
    │   └── testRoutes.js           # Test endpoints (dev only)
    │
    ├── 📂 middleware/              # Express middleware
    │   └── authMiddleware.js       # JWT authentication
    │
    ├── 📂 models/                  # Database models
    │   └── User.js                 # User schema (Mongoose)
    │
    ├── 📂 utils/                   # Utilities
    │   ├── dbInit.js               # Database initialization
    │   └── token.js                # JWT token helpers
    │
    ├── 📂 scripts/                 # Utility scripts
    │   └── verifyDB.js             # Database verification
    │
    └── 📂 src/                     # Additional source (empty)
```

## 📊 File Count Summary

### Root Files: 5
- README.md, render.yaml, run-dev.ps1, package.json, vercel.json

### Client Files: ~25
- Config files: 6
- Source files: ~19

### Server Files: ~15
- Main: 1 (server.js)
- Controllers: 3
- Routes: 4
- Models: 1
- Middleware: 1
- Utils: 2
- Config: 1
- Scripts: 1

**Total Source Files: ~45** (excluding node_modules)

## 🔑 Key Files

### Deployment
- `render.yaml` - Render deployment configuration
- `README.md` - Complete deployment guide

### Frontend Entry Points
- `client/src/main.jsx` - React entry
- `client/index.html` - HTML template

### Backend Entry Points
- `server/server.js` - Express server

### Configuration
- `client/vite.config.js` - Vite build config
- `client/tailwind.config.js` - Tailwind CSS
- `server/config/db.js` - Database config

## 📝 Environment Files Needed

### Server (.env in server/ folder)
```
MONGO_URI=...
JWT_SECRET=...
CLIPDROP_API_KEY=...
NODE_ENV=development
```

### Client (optional - uses relative paths in production)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

