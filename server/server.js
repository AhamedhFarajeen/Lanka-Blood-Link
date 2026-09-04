const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const donorRoutes = require('./routes/donorRoutes');

// Load environment variables if .env exists
try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional fallback
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://afbaf12_db_user:Uc6MCApghkID6a8g@cluster0.ckn8dxl.mongodb.net/lanka_blood_link?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());

// Member 1 Routes
app.use('/api/donors', donorRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('LankaBloodLink Member 1 API is running...');
});

// Connect to MongoDB Atlas & Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT} (http://localhost:${PORT})`);
    });
  })
  .catch((err) => {
    console.error('⚠️ MongoDB Atlas connection error:', err.message);
    console.log('Starting server in fallback mode...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (http://localhost:${PORT})`);
    });
  });
