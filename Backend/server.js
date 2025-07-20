// File: backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

// ✅ CORS Configuration - Fix CORS errors
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://localhost:5175', // Added your Vite port
    'http://localhost:5176',
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5175' // Added your Vite port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Increased limit for image data
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For form data

// ✅ Serve static files (images)
app.use('/uploads', express.static('uploads')); // Serve images from uploads folder

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Default route (optional)
app.get('/', (req, res) => {
  res.send('Home Decor E-Commerce Backend is running!');
});

// ✅ Connect DB and Start Server
sequelize.sync({ alter: true }) // or { force: true } for dev only (resets db)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err.message);
  });
