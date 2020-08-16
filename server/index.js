const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = 3000;

const { User, Conversation, Message } = require('./db');
const mobileSockets = {};

io.on('connection', socket => {
    socket.on('newUser', credentials => {
      const { name, password } = credentials;
      Promise.all([
        User.findOrCreate({
          where: {
            name,
            password
          }
        }),
        User.findAll()
      ])
        .then(([user, users]) => {
          mobileSockets[user[0].id] = socket.id;
          socket.emit('userCreated', { user: user[0], users });
          socket.broadcast.emit('newUser', user[0]);
        });
    });
  })


server.listen(port, () => console.log(`running on port ${port}`))

