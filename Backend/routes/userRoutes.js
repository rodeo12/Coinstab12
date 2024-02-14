// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);

module.exports = router;

