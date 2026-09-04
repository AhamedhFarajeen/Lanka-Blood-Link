# Lanka Blood Link

Shared React and Express foundation for the Lanka Blood Link group project.

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB (optional during initial setup)

## Setup

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Copy the example environment files if you need local overrides:

   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

3. Start the client and API together:

   ```bash
   npm run dev
   ```

The client runs at `http://localhost:5173` and the API at
`http://localhost:5050` by default. MongoDB is optional for the foundation;
the health endpoint remains available when `MONGODB_URI` is unset.

## Scripts

- `npm run dev` - run client and server in development mode
- `npm run client` - run only the Vite client
- `npm run server` - run only the Express server with file watching
- `npm start` - run the Express server without file watching
- `npm run build` - create the frontend production build

## Current routes

- `/` - home
- `/dashboard` - dashboard placeholder
- all other client routes - not-found page
- `GET /api/health` - API health check
