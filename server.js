// server.js (Main Entry Point)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./src/routes/chatRoutes');
const speechRoutes = require('./src/routes/speechRoutes');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler } = require('./src/middleware/errorMidelware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/speech', speechRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));