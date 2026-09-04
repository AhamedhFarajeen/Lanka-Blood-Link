import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';

const app = express();

const allowedOrigin = process.env.CLIENT_URL?.trim();

app.use(
  cors({
    origin: allowedOrigin || true,
  }),
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  void req;

  const databaseStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  res.status(200).json({
    success: true,
    status: 'ok',
    database: process.env.MONGODB_URI
      ? databaseStates[mongoose.connection.readyState] || 'unknown'
      : 'not configured',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
