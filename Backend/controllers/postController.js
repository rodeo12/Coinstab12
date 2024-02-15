// postController.js

const axios = require('axios');
const excel = require('exceljs');
const fs = require('fs');
const Post = require('../models/postModel');
const User = require('../models/userModel');

// Controller for handling post-related operations

module.exports = {
  getUserPosts: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Fetch user details from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch posts from the API for the specific userId
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;

      // Render page with user details and posts
      res.render('postPage', { user, posts });
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  bulkAddPosts: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Fetch posts from the API for the specific userId
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;

      // Check if posts already exist for the user in the database
      const existingPosts = await Post.find({ userId });
      if (existingPosts.length > 0) {
        return res.status(400).json({ error: 'Posts already exist for this user' });
      }

      // Save posts to the database
      await Post.insertMany(posts.map(post => ({ ...post, userId })));

      // Respond with success message
      res.json({ message: 'Posts added successfully' });
    } catch (error) {
      console.error('Error adding posts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  downloadExcel: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Fetch posts from the database for the specific userId
      const posts = await Post.find({ userId });

      // Create a new workbook
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

      // Define worksheet headers
      worksheet.columns = [
        { header: 'Title', key: 'title', width: 40 },
        { header: 'Body', key: 'body', width: 60 }
        // Add more headers as needed
      ];

      // Add data rows to the worksheet
      posts.forEach(post => {
        worksheet.addRow({ title: post.title, body: post.body });
        // Add more columns' data as needed
      });

      // Generate Excel file
      const filePath = `./temp/posts_${userId}.xlsx`;
      await workbook.xlsx.writeFile(filePath);

      // Serve the Excel file for download
      res.download(filePath, `posts_${userId}.xlsx`, () => {
        // After download, delete the temporary file
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error('Error downloading posts in Excel:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};






// const postModel = require('../models/postModel');

// // Function to create new post
// exports.createPost = async (req, res) => {
//   try {
//     const postData = req.body; // Assuming post data is sent in the request body
//     const post = await postModel.create(postData);
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
