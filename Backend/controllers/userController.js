const User = require('../models/userModel');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  addUser: async (req, res) => {
    const userData = req.body; // Assuming the request body contains user data
    console.log(userData)
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      // Create a new user instance
      const newUser = new User(userData);
      console.log(userData)
      // Save the new user to the database
      await newUser.save();
      
      
      // Respond with success message
      res.json({ message: 'User added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Implement other controller methods as needed
};

// userController.js

// const userModel = require('../models/userModel');

// // Function to add user to database
// exports.addUser = async (req, res) => {
//   try {
//     const { Name, Email, Phone, Website, City, Company }= req.body;
//     // const userData = req.body; // Assuming user data is sent in the request body
//     console.log(req.body)
//     const user = await userModel.create({ Name, Email, Phone, Website, City, Company });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error adding user:', error); 
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// routeController.js

// const User = require('../models/userModel');

// Function to add user to database
// exports.addUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     console.log('Received user data:', userData);
//     const user = await User.create(userData);
//     console.log('User added successfully:', user);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const userModel = require('../models/userModel');

// //Function to add user to database
// exports.addUser = async (req, res) => {
//   try {
//     let userData = req.body;

//     // Remove id field if present
//     delete userData.id;
    
//     // Ensure company field is a string
//     if (typeof userData.company === 'object') {
//       userData = { ...userData, company: userData.company.name };
//     }
    
//     const user = await userModel.create(userData);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// controllers/userController.js

// controllers/userController.js

// userController.js

// Function to add a user to the database
// const User = require('../models/userModel');

// // Function to add a user to the database
// exports.addUser = async (req, res) => {
//     try {
//         const userData = req.body;
//         // Check if the user already exists in the database
//         const existingUser = await User.findOne({ where: { id: userData.id } });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists in the database' });
//         }
//         // If the user does not exist, create a new user entry
//         const newUser = await User.create(userData);
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// // Function to check if a user exists in the database
// exports.checkUser = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findByPk(userId);
//         if (user) {
//             res.status(200).json({ exists: true });
//         } else {
//             res.status(200).json({ exists: false });
//         }
//     } catch (error) {
//         console.error('Error checking user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };




