const db = require('./db');
const Sequelize = require('sequelize');
const Conversation = require('./conversations')

const Message = db.define('message', {
    text: Sequelize.STRING,
    user: Sequelize.JSON,
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  });
  
Message.createMessage = async (text, sender, receiver) => {
    try {
        console.log(sender)
        const message = await Message.create({
            text,
            user: {
            _id: sender.id,
            name: sender.name
       }
    })
        const conversation = await Conversation.findOrCreateConversation(sender.id, receiver.id)
        await message.setConversation(conversation)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = Message;