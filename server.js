const express = require('express');
const server = express();
const PORT = 3005;

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

server.post('/api/user', (req, res) => {
  users.push(req.body);
  res.json(users);
  console.log(users);
});

server.listen(PORT, () => {
  console.log('The server is running');
});
