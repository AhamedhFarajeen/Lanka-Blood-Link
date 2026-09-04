# Donor feature integration notes

The donor feature files are present but intentionally not mounted. Apply the
following changes only after the team is ready to expose the donor routes.

## Client routes

Add these imports to `client/src/App.jsx`:

```jsx
import BecomeDonorPage from './member1-donors/pages/BecomeDonorPage.jsx';
import DonorDirectoryPage from './member1-donors/pages/DonorDirectoryPage.jsx';
```

Add these routes inside the existing `Routes` component:

```jsx
<Route path="/donors" element={<DonorDirectoryPage />} />
<Route path="/become-donor" element={<BecomeDonorPage />} />
```

The Navbar links can then be enabled and pointed to `/donors` and
`/become-donor`. Do not replace the existing router or application shell.

## Server route

Add this import to `server/app.js`:

```js
import donorRoutes from './routes/donorRoutes.js';
```

Mount the router after `express.json()` and before `notFoundHandler`:

```js
app.use('/api/donors', donorRoutes);
```

The donor router should use the shared CORS, JSON parsing, not-found handling,
error handling, database configuration, and server startup already provided by
the main application.
