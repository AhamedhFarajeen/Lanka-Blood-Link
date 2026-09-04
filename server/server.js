import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';

const port = Number(process.env.PORT) || 5050;

async function startServer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.info('Starting the API without a database connection.');
  }

  app.listen(port, (error) => {
    if (error) {
      console.error(`API server failed to start: ${error.message}`);
      process.exitCode = 1;
      return;
    }

    console.info(`API server listening on http://localhost:${port}`);
  });
}

startServer();
