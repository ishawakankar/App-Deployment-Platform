const { Subject } = require('rxjs');
const UserModel = require('../db/models/users');

const s = new Subject();

function addUser(req) { // to add user to users table
  const user = new UserModel(req);
  // const observable = Observable.create((observer) => {
  user.save((error, doc) => {
    try {
      s.next(doc);
    } catch (err) {
      s.error(err);
    }
  });
  // })
  return s;
}

function getUsers() {
  return new Promise((resolve) => {
    UserModel.find(null, (err, doc) => {
      resolve(doc);
    });
  });
}

function getUserByName(req) { // to get user details by users table
  // const observable = Observable.create((observer) => {
  UserModel.find({ userName: req.userName }, (err, doc) => {
    try {
      s.next(doc);
    } catch (error) {
      s.error(error);
    }
  });
  // })
  return s;
}

function deleteUser(userid) { // to delete user for a particular user id
  // const observable = Observable.create((observer) => {
  UserModel.findOneAndDelete({ userId: userid }, (err, doc) => {
    try {
      s.next(doc);
    } catch (error) {
      s.error(error);
    }
  });
  // })
  return s;
}

function findAndUpdateUser(oldData, newData) {
  // find user by oldData and update user by newData
  // const observable = Observable.create((observer) => {
  UserModel.findOneAndUpdate(oldData, newData, {
    upsert: true,
    new: true,
  }, (error, doc) => {
    try {
      s.next(doc);
    } catch (err) {
      s.error(err);
    }
  });
  // })
  return s;
}

module.exports = {
  addUser,
  getUserByName,
  getUsers,
  deleteUser,
  findAndUpdateUser,
};
