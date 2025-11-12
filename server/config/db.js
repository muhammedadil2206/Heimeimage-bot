const mongoose = require('mongoose');

// Initialize collections in the database
const initializeCollections = async (db) => {
  try {
    console.log('🔧 Initializing collections...');
    
    // Get existing collections
    const existingCollections = await db.listCollections().toArray();
    const collectionNames = existingCollections.map(c => c.name);
    
    // Expected collections
    const expectedCollections = ['users'];
    
    // Create collections if they don't exist
    for (const collectionName of expectedCollections) {
      if (!collectionNames.includes(collectionName)) {
        console.log(`   Creating collection: ${collectionName}`);
        await db.createCollection(collectionName);
        console.log(`   ✅ Collection "${collectionName}" created`);
      } else {
        console.log(`   ✅ Collection "${collectionName}" already exists`);
      }
    }
    
    // Verify collections
    const finalCollections = await db.listCollections().toArray();
    console.log(`📁 Final collections: ${finalCollections.map(c => c.name).join(', ')}`);
    
    // Create indexes for users collection
    if (collectionNames.includes('users') || finalCollections.some(c => c.name === 'users')) {
      const usersCollection = db.collection('users');
      
      // Create email index if it doesn't exist
      try {
        const indexes = await usersCollection.indexes();
        const hasEmailIndex = indexes.some(idx => idx.key && idx.key.email === 1);
        
        if (!hasEmailIndex) {
          console.log('   Creating email index on users collection...');
          await usersCollection.createIndex({ email: 1 }, { unique: true });
          console.log('   ✅ Email index created');
        } else {
          console.log('   ✅ Email index already exists');
        }
      } catch (indexError) {
        console.warn('   ⚠️  Could not create email index:', indexError.message);
      }
    }
    
    console.log('✅ Collections initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing collections:', error.message);
    // Don't throw error, just log it
  }
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not set in environment variables');
      throw new Error('MONGO_URI is not configured');
    }

    console.log('Connecting to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection state: ${conn.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
    
    // Test connection and list collections
    const collections = await conn.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log(`📁 Existing collections: ${collectionNames.join(', ') || 'None'}`);
    
    // Verify database name
    const dbName = conn.connection.name;
    if (dbName !== 'heimeimage') {
      console.warn(`⚠️  Warning: Connected to database "${dbName}" but expected "heimeimage"`);
      console.warn(`   Please update MONGO_URI to use "heimeimage" database`);
    } else {
      console.log(`✅ Connected to correct database: heimeimage`);
    }
    
    // Initialize collections and indexes
    await initializeCollections(conn.connection.db);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('Failed to connect to MongoDB server. Please check:');
      console.error('1. MongoDB connection string is correct');
      console.error('2. MongoDB server is running');
      console.error('3. Network connection is available');
      console.error('4. IP address is whitelisted in MongoDB Atlas (if using Atlas)');
    }
    
    if (error.name === 'MongoParseError') {
      console.error('Invalid MongoDB connection string format');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;

