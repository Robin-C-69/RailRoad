const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

// Get all users
router.get('/', getAllUsers)

// Get user by id
router.get('/:id', getUserById)

// Create user
router.post('/', createUser)

// Update user
router.put('/:id', updateUser)

// Delete user
router.delete('/:id', deleteUser)

module.exports = router