// Script to clear all collections and drop problematic indexes
// Run this with: node scripts/clear-database.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function clearDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const db = mongoose.connection.db;
    
    // Collections to clear
    const collections = ['works', 'books', 'awards'];
    
    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName);
        
        // Get count before clearing
        const count = await collection.countDocuments();
        
        if (count > 0) {
          console.log(`🗑️  Clearing ${collectionName} (${count} documents)...`);
          await collection.deleteMany({});
          console.log(`✅ Cleared ${collectionName}`);
        } else {
          console.log(`ℹ️  ${collectionName} is already empty`);
        }
        
        // Drop all indexes except _id
        const indexes = await collection.indexes();
        for (const index of indexes) {
          if (index.name !== '_id_') {
            console.log(`  📋 Dropping index: ${index.name}`);
            await collection.dropIndex(index.name);
          }
        }
      } catch (error) {
        console.log(`⚠️  Collection ${collectionName} might not exist yet: ${error.message}`);
      }
    }
    
    await mongoose.connection.close();
    console.log('✨ Database cleared! All indexes dropped.');
    console.log('💡 New indexes will be created automatically when you restart the server.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearDatabase();
