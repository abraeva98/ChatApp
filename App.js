import 'react-native-gesture-handler';
import React from 'react';
import HomePage from './components/HomePage';
import Chat from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Home" component={HomePage} options={{ title: 'Welcome' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
}

