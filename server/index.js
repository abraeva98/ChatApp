const server = require('http').createServer().listen(3000);
const db = require('./db/db');
const io = require('socket.io')(server);
const User = require('./db/user')
const Conversation = require('./db/conversations')
const Message = require('./db/msg')
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

  socket.on('chat', users => {
    Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
      .then(conversation => socket.emit('priorMessages', conversation.messages));
  });

  socket.on('message', ({ text, sender, receiver }) => {
    Message.createMessage(text, sender, receiver)
      .then(message => {
        socket.emit('incomingMessage', message);
        const receiverSocketId = mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
  });
});




// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const io = require('socket.io').listen(server)
// const port = 3000;

// const { User, Conversation, Message } = require('./db');
// const mobileSockets = {};

// io.on('connection', socket => {
//   socket.on('newUser', credentials => {
//     const { name, password } = credentials;
//     Promise.all([
//       User.findOrCreate({
//         where: {
//           name,
//           password
//         }
//       }),
//       User.findAll()
//     ])
//       .then(([user, users]) => {
//         if(!users) {
//           users = [];
//         }
//         mobileSockets[user[0].id] = socket.id;
//         socket.emit('userCreated', { user: user[0], users });
//         socket.broadcast.emit('newUser', user[0]);
//       });
//   });

//   socket.on('chat', users => {
//     Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
//       .then(conversation => socket.emit('priorMessages', conversation.messages));
//   });
  // socket.on('new-channel', conersation => {
  //   socket.broadcast.emit('new-channel', conersation);
  // });

  // socket.on('new-message', message => {
  //   socket.broadcast.emit('new-message', message);
  // });
//   socket.on('message', ({ text, sender, receiver }) => {
//     Message.createMessage(text, sender, receiver)
//       .then(message => {
//         socket.emit('incomingMessage', message);
//         const receiverSocketId = mobileSockets[receiver.id];
//         socket.to(receiverSocketId).emit('incomingMessage', message);
//       });
//   });
// });



// server.listen(port, () => console.log(`running on port ${port}`))

