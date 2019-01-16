const mongoose = require('mongoose');

// const dateFormat = require('dateformat');

const appSchema = new mongoose.Schema({
  appId: { type: String },
  userId: { type: String, required: true },
  app_name: { type: String, required: true },
  timestamp: { type: String, default: Date.now },
  deploy_history: [{type: String, default: Date.now}],
  status: { type: String, required: true },
  app_URL: { type: String, required: true, unique: true },
});

const appsModel = mongoose.model('user_apps', appSchema);
module.exports = appsModel;
