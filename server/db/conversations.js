const db = require('./db');
const { Sequelize } = db;
const { Op } = Sequelize;
const Message = require('./msg')
const Conversation = db.define('conversation', {
    name: Sequelize.STRING
});
Conversation.findOrCreateConversation = function(user1Id, user2Id) {
    return Conversation.find({
      where: {
        user1Id: {
          [Op.or]: [user1Id, user2Id]
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id]
        }
      },
      include: [ Message ],
      order: [[ Message, 'createdAt', 'DESC' ]]
    })
      .then(conversation => {
        if(conversation) {
          return conversation;
        } else {
          return Conversation.create({
            user1Id: user1Id,
            user2Id: user2Id
          }, {
            include: [ Message ],
            order: [[ Message, 'createdAt', 'DESC' ]]
          });
        }
      });
  };
  
module.exports = Conversation;
