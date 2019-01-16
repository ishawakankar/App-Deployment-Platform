const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    listen: { type: Number, unique: true },
    server_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profileUrl: { type: String, required: true, unique: true },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
