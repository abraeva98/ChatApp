const db = require('../server/db/db')
const Conversation = require('../server/db/conversations')
const Message = require('../server/db/msg');
const User = require('../server/db/user');
// const { InteractionManager } = require('react-native');
// const { default: Users } = require('./components/Users');

const conversations = [ 
    { name: 'really_random' },
    { name: 'generally_speaking' },
    { name: 'dogs_of_fullstack' },
    { name: 'lunch_planning' }
  ];
  
const users = [{
    name: 'Irina',
    password: '1234'
  }, {
    name: 'Jorge',
    password: '1234'
  }
]

const messages = [
    {text: 'hello', user: 'Irina', _id: 1},
    {text: 'bye', user: 'Jorge', _id: 2},
]

const seed = () => 
    Promise.all(users.map(user => 
        User.create(user))
    )
    .then(() => 
    Promise.all(conversations.map(chat => 
        Conversation.create(chat))
        ))
    .then(()=>
     Promise.all(messages.map(msg => 
        Message.create(msg))
    )
  )

  const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
      .then(() => {
        console.log('Seeding databse...');
        return seed();
      })
      .catch(err => {
        console.log('Error while seeding');
        console.log(err.stack);
      })
      .then(() => {
        db.close();
        return null;
      });
  };
  
  main();