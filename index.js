require('dotenv').config(); // Load environment variables at the start

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api', notificationRoutes);
app.use('/api', certificateRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
