const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  userName: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: { type: String, required: true, unique: true },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
