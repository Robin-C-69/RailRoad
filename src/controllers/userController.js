const User = require('../models/User');

// Get all users
const getAllUsers = (req, res) => {
    User.find({}, (err, users)=>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(200).json(users)
        }
    })
}

// Get one user by id //TODO Implement test for match _id model
const getUserById = (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
       User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user) {
            res.status(404).send("Utilisateur non trouvé")
        } else {
            res.status(200).json(user)
        }
    }) 
    } else {
        res.status(400).send('Le champ _id n\'est pas correct')
    }
    
}

// Create user
const createUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).json(user)
        }
    })
}

// Update user
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user) {
            res.status(404).send('Utilisateur non trouvé');
        } else {
            res.status(200).json(user);
        }
    })
}

// Delete user
const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user) {
            res.status(404).send('Utilisateur non trouvé');
        } else {
            res.status(200).json(user);
        }
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}