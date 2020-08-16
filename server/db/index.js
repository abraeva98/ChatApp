const db = require('./db');
const Conversation = require('./conversations')
const Message = require('./msg');
const User = require('./user');

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
    db,
    Conversation,
    User,
    Message
};