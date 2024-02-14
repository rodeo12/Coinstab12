// userModel.js

const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../database');

// const User = sequelize.define('User', {

//   name: DataTypes.STRING,
//   email: DataTypes.STRING,
//   phone: DataTypes.STRING,
//   website: DataTypes.STRING,
//   city: DataTypes.STRING,
//   company: DataTypes.STRING
// });

// module.exports = User;
