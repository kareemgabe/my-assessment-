const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verified: Boolean,
    verificationCode: String
});

module.exports = mongoose.model('User', userSchema);
