require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const historyRoutes = require('./routes/historyRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

// CORS configuration for production
const getCorsOrigin = () => {
  if (process.env.CLIENT_URL) {
    const urls = process.env.CLIENT_URL.split(',').map(url => url.trim()).filter(url => url);
    return urls.length > 0 ? urls : '*';
  }
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ CLIENT_URL not set in production. Allowing all origins.');
    return '*';
  }
  return '*';
};

const corsOptions = {
  origin: getCorsOrigin(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: process.env.NODE_ENV === 'production' ? 100 : 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api', limiter);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/history', historyRoutes);

// Test route (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/test', testRoutes);
  console.log('🧪 Test routes enabled (development mode only)');
}

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle React routing - return all non-API requests to React app
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    } else {
      next();
    }
  });
}

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// PORT
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('=== Environment Variables Check ===');
  console.log('PORT:', process.env.PORT || '5000 (default)');
  console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET');
  console.log('CLIPDROP_API_KEY:', process.env.CLIPDROP_API_KEY ? `Set (${process.env.CLIPDROP_API_KEY.length} chars)` : 'NOT SET');
  console.log('CLIENT_URL:', process.env.CLIENT_URL || 'Not set (defaulting to *)');
  console.log('===================================');

  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
