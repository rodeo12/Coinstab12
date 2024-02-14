const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { MONGO_URI } = require('./config/database');

const app = express();
app.use(express.json())


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
