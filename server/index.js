const server = require('http').createServer().listen(3000);
const db = require('./db/db');
const io = require('socket.io')(server);
const User = require('./db/user')
const Conversation = require('./db/conversations')
const Message = require('./db/msg')
const mobileSockets = {};

io.on('connection', (socket) => {
  try {
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
  
    socket.on('chat', async users => {
      const conversation = await Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
      socket.emit('priorMessages', conversation.messages);
    });
  
    socket.on('message', async ({ text, sender, receiver }) => {
      const message = await Message.createMessage(text, sender, receiver)
          socket.emit('incomingMessage', message);
          const receiverSocketId = mobileSockets[receiver.id];
          socket.to(receiverSocketId).emit('incomingMessage', message);
        });
    
  } catch (error) {
      console.log(error)
  }
});


