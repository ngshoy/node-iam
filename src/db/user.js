const mongoose = require('mongoose');
const { User } = require('./models/userModel');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const insertUserData = data => {
  const newUser = new User(data);
  return newUser.save();
}

const retrieveUserData = userId => {
  return User.findOne({ userId });
}

module.exports = {
  insertUserData,
  retrieveUserData
}
