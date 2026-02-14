// Script to drop the old text index that's causing issues
// Run this with: node scripts/drop-text-index.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function dropTextIndex() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const db = mongoose.connection.db;
    const collection = db.collection('works');
    
    console.log('📋 Getting existing indexes...');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(i => i.name).join(', '));
    
    // Find and drop the text index
    const textIndex = indexes.find(idx => idx.key && idx.key._fts === 'text');
    
    if (textIndex) {
      console.log(`🗑️  Dropping text index: ${textIndex.name}`);
      await collection.dropIndex(textIndex.name);
      console.log('✅ Text index dropped successfully!');
      console.log('💡 The new index will be created automatically when you restart the server.');
    } else {
      console.log('ℹ️  No text index found to drop.');
    }
    
    await mongoose.connection.close();
    console.log('✨ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

dropTextIndex();
