// postController.js

const postModel = require('../models/postModel');

// Function to create new post
exports.createPost = async (req, res) => {
  try {
    const postData = req.body; // Assuming post data is sent in the request body
    const post = await postModel.create(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
