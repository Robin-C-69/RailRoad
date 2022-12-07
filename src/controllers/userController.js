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

module.exports = {
    getAllUsers
}