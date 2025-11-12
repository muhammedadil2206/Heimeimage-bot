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
    return process.env.CLIENT_URL.split(',').map(url => url.trim());
  }
  // Allow all origins in development, specific URLs in production
  return process.env.NODE_ENV === 'production' ? [] : '*';
};

const corsOptions = {
  origin: getCorsOrigin(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet({
  contentSecurityPolicy: false, // Allow base64 images
  crossOriginEmbedderPolicy: false,
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Rate limiting - more lenient for production
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: process.env.NODE_ENV === 'production' ? 100 : 60, // More requests in production
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api', limiter);

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/history', historyRoutes);

// Test route (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/test', testRoutes);
  console.log('Test routes enabled (development mode only)');
}

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// PORT - Render uses PORT environment variable, default to 5000 for local
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Verify environment variables
  console.log('=== Environment Variables Check ===');
  console.log('PORT:', process.env.PORT || '5000 (default)');
  console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET');
  console.log('CLIPDROP_API_KEY:', process.env.CLIPDROP_API_KEY ? `Set (${process.env.CLIPDROP_API_KEY.length} chars)` : 'NOT SET');
  console.log('CLIENT_URL:', process.env.CLIENT_URL || 'Not set (defaulting to *)');
  console.log('===================================');
  
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

