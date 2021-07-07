const express = require('express');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variable.env' });
const PORT = 3005;

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database successfully');
    }
  }
);

server.use(express.json());

const users = [
  {
    id: 'lovelyoch',
    name: 'changhoon',
    email: 'changoon@gamil.com',
  },
  {
    id: 'lovelyksy',
    name: 'seungyi',
    email: 'seungyi@gamil.com',
  },
];

server.get('/api/user', (req, res) => {
  res.json(users);
});

server.get('/api/user/:id', (req, res) => {
  const user = users.find((u) => {
    return u.id === req.params.id;
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ errorMessage: 'User was not found' });
  }
});

server.post('/api/user', (req, res) => {
  users.push(req.body);
  res.json(users);
});

// findIndex 만족하는 요소가 없으면 -1 반환
server.put('/api/user/:id', (req, res) => {
  let foundIndex = users.findIndex((u) => {
    return u.id === req.params.id;
  });
  if (foundIndex === -1) {
    res.status(404).json({ errorMessage: 'User was not found' });
  } else {
    users[foundIndex] = { ...users[foundIndex], ...req.body };
    res.json(users[foundIndex]);
  }
});

server.delete('/api/user/:id', (req, res) => {
  let foundIndex = users.findIndex((u) => {
    return u.id === req.params.id;
  });
  if (foundIndex === -1) {
    res.status(404).json({ errorMessage: 'User was not found' });
  } else {
    let foundUser = users.splice(foundIndex, 1);
    res.json(foundUser[0]);
  }
});

server.listen(PORT, () => {
  console.log('The server is running');
});
