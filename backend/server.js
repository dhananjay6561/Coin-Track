import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js'; // Add this import

dotenv.config();

// Connect to database after env vars are loaded
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);