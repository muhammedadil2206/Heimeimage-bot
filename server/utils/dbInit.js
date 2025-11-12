const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Initialize database collections and indexes
 */
const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database...');
    
    // Get database connection
    const db = mongoose.connection.db;
    if (!db) {
      console.error('❌ Database not connected');
      return;
    }
    
    // List existing collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log(`📁 Existing collections: ${collectionNames.join(', ') || 'None'}`);
    
    // Ensure users collection exists
    if (!collectionNames.includes('users')) {
      console.log('   Creating users collection...');
      await db.createCollection('users');
      console.log('   ✅ Users collection created');
    } else {
      console.log('   ✅ Users collection already exists');
    }
    
    // Create indexes
    try {
      const usersCollection = db.collection('users');
      
      // Create email index
      const indexes = await usersCollection.indexes();
      const hasEmailIndex = indexes.some(idx => 
        idx.key && idx.key.email === 1 && idx.unique === true
      );
      
      if (!hasEmailIndex) {
        console.log('   Creating email index...');
        await usersCollection.createIndex(
          { email: 1 }, 
          { unique: true, name: 'email_1' }
        );
        console.log('   ✅ Email index created');
      } else {
        console.log('   ✅ Email index already exists');
      }
    } catch (indexError) {
      console.warn('   ⚠️  Index creation warning:', indexError.message);
    }
    
    // Verify database name
    const dbName = db.databaseName;
    if (dbName !== 'heimeimage') {
      console.warn(`⚠️  Warning: Connected to database "${dbName}" but expected "heimeimage"`);
      console.warn(`   Please update MONGO_URI to use "heimeimage" database`);
    } else {
      console.log(`✅ Connected to correct database: heimeimage`);
    }
    
    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
};

module.exports = initializeDatabase;

