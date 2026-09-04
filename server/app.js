import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import donorRoutes from './routes/donorRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

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

// ---- Feature routes ----
app.use('/api/donors', donorRoutes); // Member 1
app.use('/api/requests', requestRoutes); // Member 2
app.use('/api/matching', matchingRoutes); // Member 3
app.use('/api/dashboard', dashboardRoutes); // Dashboard aggregation

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
