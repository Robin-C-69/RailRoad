require("dotenv").config(); // loading env variables
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
bodyParser.json()


const isLoggedIn = async (req, res, next) => {
    try {
      // check if auth header exists
      if (req.headers.authorization) {
        // parse token from header
        const token = req.headers.authorization.split(" ")[1]; //split the header to get the token
        if (token) {
          const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          if (payload) {
            // store user data in request object
            req.user = payload;
            next();
          } else {
            res.status(400).json({ error: "token verification failed" });
          }
        } else {
          res.status(400).json({ error: "malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  
const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.findOne({ 'username': payload.username }, (err, user) => {
      if (user.role != "admin") {
        res.status(401).json({ error: "Access restricted to Admins only" });
      }else {
        next();
      }
  })
}

const itsMe = async(req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  User.findById(req.params.id, (err, user) => {
    if (err) {
        res.status(500).send(err)
    } else if (user.username != payload.username) {
        res.status(401).send("Il ne s'agit pas de vous !")
    } else {
        next();
      }
    })
}

// export custom middleware
  module.exports = {
    isLoggedIn,
    isAdmin,
    itsMe
  };
