const dotenv = require('dotenv');
dotenv.config();

// Add debug logging
console.log('Environment Variables:', {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY?.substring(0, 5) + '...',
  port: process.env.PORT
});

const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://voice-text-app-1.onrender.com',  // Your frontend URL
    'https://voice-text-app.onrender.com',    // Your backend URL
    'http://localhost:5173'                   // Local development
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
