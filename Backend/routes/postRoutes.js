// postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to create a new post
router.post('/', postController.createPost);

module.exports = router;
