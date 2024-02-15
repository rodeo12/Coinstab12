// postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to fetch and display user posts
router.get('/:userId', postController.getUserPosts);

// Route to handle bulk adding of posts to the database
router.post('/:userId/bulkAdd', postController.bulkAddPosts);

// Route to handle downloading posts in Excel format
router.get('/:userId/downloadExcel', postController.downloadExcel);

module.exports = router;

