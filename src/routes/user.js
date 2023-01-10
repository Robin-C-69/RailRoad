const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

const {
    signUpUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController')
const { isLoggedIn, isAdmin, itsMe } = require('../middlewares/middleware');

// Create User
router.post('/sign-up', signUpUser)

// User can login and get a Token 
router.post('/login', loginUser)


//* All user routes

// Specific user can check his infos
router.get('/myprofile/:id',isLoggedIn,itsMe, getUserById)

// Specific user can update his infos 
router.put('/update-profile/:id',isLoggedIn, itsMe, updateUser)

// Specific user can delete is profile
router.delete('/delete-profile/:id',isLoggedIn, itsMe, deleteUser)


//* All admin routes

// Get all users
router.get('/',isLoggedIn, isAdmin, getAllUsers)

// Get user by id
router.get('/:id',isLoggedIn,isAdmin, getUserById)

// Update user
router.put('/:id',isLoggedIn, isAdmin, updateUser)

// Delete user
router.delete('/:id',isLoggedIn, isAdmin, deleteUser)

module.exports = router