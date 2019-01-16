const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/git_app_data');
// mongoose.connect('mongodb://mongo_db:27017/git_app_data');

function db() {
  const { connection } = mongoose;

  connection.on('error', console.error.bind(console, 'connection error'));

  connection.on('open', () => {
    console.log('connected to database');
  });
}

module.exports = db;
