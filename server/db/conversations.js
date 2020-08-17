const db = require('./db');
const Sequelize = require('sequelize');
const { Op }= Sequelize;
const Message = require('./msg')
const Conversation = db.define('conversation', {
  
});

Conversation.findOrCreateConversation = async function(user1Id, user2Id) {
  try {
    const [instance, wasCreated] = await Conversation.findOrCreate({
            where: {
              user1Id: {
                [Op.or]: [user1Id, user2Id]
              },
              user2Id: {
                [Op.or]: [user1Id, user2Id]
              }
            },
            include: {model: Message},
            order: [[ Message, 'createdAt', 'DESC' ]]
      })
      console.log('CONVO', instance)
      return instance;
  } catch (error) {
    console.log(error)
  }
}

module.exports = Conversation;