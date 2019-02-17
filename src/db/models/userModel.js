const { model } = require('mongoose');

const User = model('User', {
  userName: {
    type: String,
    required: true,
    minLength: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1
  },
  email: {
    type: String,
    required: true,
    minLength: 1
  }
});

module.exports = { User };
