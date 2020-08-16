const db = require('./db');
const Sequelize = require('sequelize');
const Conversation = require('./conversations')

const Message = db.define('message', {
    text: Sequelize.STRING,
    user: Sequelize.STRING,
    _id: {
        type: Sequelize.INTEGER,
        // defaultValue: UUIDV4,
        primaryKey: true
    }
})

Message.createMessage = (text, sender, receiver) => {
    return Promise.all([
        Message.createMessage({
            text,
            user: {
                _id: sender.id,
                name: sender.name
            }
        }),
        Conversation.findOrCreateConversation(sender.id, receiver.id)
    ])
    .then(([message, conversation]) => message.setConversation(conversation))
}

module.exports = Message;