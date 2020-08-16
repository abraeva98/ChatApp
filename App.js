import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import { createStackNavigator } from 'react-navigation-stack'
import {
  createAppContainer
} from 'react-navigation';
// import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import Users from './components/Users';
import Chat from './components/Chat';

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Users: {
    screen: Users
  },
  Chat: {
    screen: Chat
  }
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerTitle: 'Chat!'
  }
});

const AppContainer = createAppContainer(RootStack); 

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    );
  }
}









// import 'react-native-gesture-handler';
// import React from 'react';
// import HomePage from './components/HomePage';
// import Chat from './components/Chat';
// import Login from './components/Login';
// import Users from './components/Users';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import { Provider } from 'react-redux';
// import store from './store/index';
// const Stack = createStackNavigator();

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen name="Home" component={HomePage} options={{ title: 'Welcome' }} />
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Chat" component={Chat} />
//             <Stack.Screen name="Users" component={Users} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     );
//     }
// }

