const { model } = require('mongoose');

const User = model('User', {
  userId: {
    type: String,
    required: true,
    minLength: 1
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
});

module.exports = { User };
