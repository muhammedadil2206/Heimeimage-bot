/**
 * Script to verify MongoDB database setup
 * Run with: node server/scripts/verifyDB.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const verifyDatabase = async () => {
  try {
    console.log('🔍 Verifying MongoDB Database Setup...\n');
    
    // Check MONGO_URI
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not set in environment variables');
      process.exit(1);
    }
    
    console.log('✅ MONGO_URI is set');
    console.log('   URI:', process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@'));
    
    // Connect to MongoDB
    console.log('\n📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Connected to MongoDB');
    console.log('   Host:', mongoose.connection.host);
    console.log('   Database:', mongoose.connection.name);
    console.log('   Connection State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');
    
    // Verify database name
    const dbName = mongoose.connection.name;
    if (dbName !== 'heimeimage') {
      console.error(`\n⚠️  WARNING: Connected to database "${dbName}" but expected "heimeimage"`);
      console.error('   Please update MONGO_URI to use "heimeimage" database');
      console.error('   Example: mongodb+srv://...@cluster.mongodb.net/heimeimage?...');
    } else {
      console.log('\n✅ Database name is correct: heimeimage');
    }
    
    // List collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('\n📁 Collections:');
    if (collectionNames.length === 0) {
      console.log('   No collections found');
    } else {
      collectionNames.forEach(name => {
        console.log(`   - ${name}`);
      });
    }
    
    // Check users collection
    if (collectionNames.includes('users')) {
      console.log('\n✅ Users collection exists');
      
      // Count users
      const userCount = await User.countDocuments();
      console.log(`   Total users: ${userCount}`);
      
      // Check indexes
      const usersCollection = db.collection('users');
      const indexes = await usersCollection.indexes();
      console.log(`   Indexes: ${indexes.length}`);
      indexes.forEach(idx => {
        console.log(`     - ${JSON.stringify(idx.key)} (unique: ${idx.unique || false})`);
      });
      
      // Sample user
      if (userCount > 0) {
        const sampleUser = await User.findOne().select('name email prompts');
        console.log('\n📊 Sample user:');
        console.log(`   Name: ${sampleUser.name}`);
        console.log(`   Email: ${sampleUser.email}`);
        console.log(`   Prompts: ${sampleUser.prompts?.length || 0}`);
      }
    } else {
      console.log('\n⚠️  Users collection does not exist');
      console.log('   It will be created automatically when first user signs up');
    }
    
    // Verify User model
    console.log('\n🔧 Verifying User model...');
    try {
      const testUser = new User({
        name: 'Test',
        email: 'test@example.com',
        password: 'test123'
      });
      console.log('✅ User model is valid');
    } catch (error) {
      console.error('❌ User model validation error:', error.message);
    }
    
    console.log('\n✅ Database verification complete!');
    console.log('\n📝 Summary:');
    console.log(`   Database: ${dbName}`);
    console.log(`   Collections: ${collectionNames.length}`);
    console.log(`   Users: ${await User.countDocuments()}`);
    console.log(`   Status: ${dbName === 'heimeimage' ? '✅ Ready' : '⚠️  Check database name'}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database verification failed:');
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    process.exit(1);
  }
};

verifyDatabase();

