const User = require('../models/User');
//const updatedUser = require('../models/UserasUser');
const counter = require('../models/counter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { isLoggedIn } = require("../middlewares/middleware");
require("dotenv").config()

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

// Get one user by the id
const getUserById = (req, res) => {
    if (req.params.id.match(/^[0-9]*/)) {
       User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user) {
            res.status(404).send("User not found")
        } else {
            res.status(200).json(user)
        }
    }) 
    } else {
        res.status(400).send('_id field is not correct')
    }
}

// Create user
const signUpUser = (req, res) => {
    counter.findOneAndUpdate(
         {id: "autoval"},
         {"$inc": {"seq":1}},
         {new: true},async(err,cd) =>{
           let seqId;
            if (cd == null){
                const newval = new counter({id:"autoval",seq:1})
                newval.save()
                seqId=1
            }else{
                seqId=cd.seq

            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const newUser = new User(req.body);
            newUser._id = seqId;
            newUser.save((err, user) => {
             if (err) {
                 res.status(500).send(err)
             } else {
                 res.status(201).json(user)
             }

         })
         }
    )
}

const loginUser = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = bcrypt.compare(req.body.password, user.password);
          if (result) {
            // sign token and send it in response
            const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token });
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
}

// udpate user as user
/* const updateUserAsUser = (req, res) => {
    updatedUser.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user) {
            res.status(404).send('Utilisateur non trouvé');
        } else {
            res.status(200).json(user);
        }
    })
}
*/

// Update user
const updateUser = (req, res) => {
    if (req.params.id.match(/^[0-9]*/)){
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user);
            }
        })
    } else {
        res.status(400).send('_id field is not correct')
    }
}

// Delete user
const deleteUser = (req, res) => {
    if (req.params.id.match(/^[0-9]*/)) {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
               res.status(500).send(err)
            } else if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user);
            }
        })
    } else {
        res.status(400).send('_id field is not correct')
    }
}

module.exports = {
    signUpUser,
    loginUser,
    getAllUsers,
    getUserById,
    //updateUserAsUser,
    updateUser,
    deleteUser
}