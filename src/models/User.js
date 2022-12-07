const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: Number,
    pseudo: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
},
{_id: false})

module.exports = new mongoose.model('User', userSchema);