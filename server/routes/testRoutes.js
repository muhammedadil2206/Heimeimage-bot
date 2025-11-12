const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// Test endpoint to verify Clipdrop API
router.post('/test-clipdrop', async (req, res) => {
  try {
    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({ message: 'CLIPDROP_API_KEY is not set' });
    }

    const testPrompt = 'a red apple on a white background';
    const formData = new FormData();
    formData.append('prompt', testPrompt);

    console.log('Testing Clipdrop API with prompt:', testPrompt);
    console.log('API Key length:', process.env.CLIPDROP_API_KEY.length);

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
        timeout: 30000,
      }
    );

    console.log('Clipdrop test response status:', response.status);
    console.log('Response data length:', response.data?.length || 0);

    if (response.status === 200 && response.data) {
      const imageBase64 = Buffer.from(response.data).toString('base64');
      return res.status(200).json({
        success: true,
        message: 'Clipdrop API is working!',
        imageSize: response.data.length,
        imageUrl: `data:image/png;base64,${imageBase64}`,
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: `Clipdrop API returned status ${response.status}`,
      });
    }
  } catch (error) {
    console.error('Clipdrop test error:', error.message);
    if (error.response) {
      const errorText = Buffer.from(error.response.data).toString('utf8');
      return res.status(error.response.status).json({
        success: false,
        message: `Clipdrop API error: ${error.response.status}`,
        error: errorText,
        status: error.response.status,
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Test endpoint to verify MongoDB connection
router.get('/test-db', async (req, res) => {
  try {
    console.log('=== MongoDB Test Endpoint ===');
    
    // Check MongoDB connection
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    console.log('MongoDB connection state:', states[connectionState]);
    
    if (connectionState !== 1) {
      return res.status(500).json({
        success: false,
        message: `MongoDB is not connected. State: ${states[connectionState]}`,
        connectionState: states[connectionState]
      });
    }
    
    // Test database operations
    console.log('Testing database operations...');
    
    // Count users
    const userCount = await User.countDocuments();
    console.log('Total users in database:', userCount);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Try to find a user
    const testUser = await User.findOne();
    console.log('Sample user:', testUser ? { id: testUser._id, email: testUser.email, name: testUser.name } : 'No users found');
    
    // Check database name
    const dbName = mongoose.connection.name;
    const isCorrectDb = dbName === 'heimeimage';
    
    return res.status(200).json({
      success: true,
      message: 'MongoDB is connected and working!',
      connectionState: states[connectionState],
      database: dbName,
      databaseCorrect: isCorrectDb,
      expectedDatabase: 'heimeimage',
      host: mongoose.connection.host,
      userCount,
      collections: collections.map(c => c.name),
      sampleUser: testUser ? { 
        id: testUser._id, 
        email: testUser.email, 
        name: testUser.name,
        promptsCount: testUser.prompts?.length || 0
      } : null,
      warning: !isCorrectDb ? `⚠️ Connected to "${dbName}" but expected "heimeimage". Please update MONGO_URI.` : null
    });
  } catch (error) {
    console.error('MongoDB test error:', error);
    return res.status(500).json({
      success: false,
      message: 'MongoDB test failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;

