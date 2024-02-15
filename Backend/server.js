const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT ||5000

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const  MONGO_URI  = process.env.MONGO_URI 


const app = express();
app.use(express.json())
app.use(cors());


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server

app.listen(PORT, () =>{
   console.log(`Server running on port ${PORT}`)}) ;
