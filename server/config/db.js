import mongoose from 'mongoose';

async function connectDatabase() {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    console.info('MONGODB_URI is not configured; starting without a database connection.');
    return false;
  }

  await mongoose.connect(uri);
  console.info('MongoDB connected.');
  return true;
}

export default connectDatabase;
