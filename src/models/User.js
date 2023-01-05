const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    pseudo: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema);