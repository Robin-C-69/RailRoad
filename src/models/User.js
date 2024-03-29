const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: Number,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    }
},
{_id: false})

module.exports = mongoose.model('User', userSchema);