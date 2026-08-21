// Vercel serverless entry point
// Imports the Express app from server/index.js and re-exports it.
// Vercel handles listening; the app just needs to export the handler.

import app from "../server/index.js";

export default app;
