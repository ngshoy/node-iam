require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {
  insertUserData,
  retrieveUserData
} = require('./db/user');

const app = express();
const PORT = process.env.PORT || 8888;
const users = [{
    id: 1,
    username: 'admin',
    password: 'admin'
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest'
  },
]

app.use(bodyParser.json());
app.use(cors());

const getErrorCode = err => {
  let errCode;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    errCode = 400;
  } else {
    errCode = 500;
  }
  return errCode;
}

const handleRequest = async (req, res, cb, params) => {
  let document;

  try {
    document = await cb(...params);
  } catch (err) {
    const errCode = getErrorCode(err);
    return res.status(errCode).send(err);
  }

  if (!document) {
    return res.status(404).send();
  }
  return res.status(200).send(document);
}

app.get('/health', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();
  res
    .status(200)
    .send(`Server time is ${localTime}`);
});

app.post('/CreateUser', (req, res) => {
  handleRequest(req, res, insertUserData, [req.body]);
});

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.send('You need a username and password');
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (!user) {
    res.status(401);
    res.send('User not found');
    return;
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, 'mysupersecretkey', {
    expiresIn: '3 hours'
  });
  res
    .status(200)
    .send({
      access_token: token
    });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});