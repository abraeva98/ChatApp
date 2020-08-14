import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput } from 'react-native';
import io from 'socket.io-client';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      chatMessage: '',
      socket: ''
    }
  }
  componentDidMount() {
    this.socket = io("http://192.168.1.7:3000");
  }
  sumbitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage)
    this.setState({chatMessage: ''})
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Rabotai suka ebanka</Text>
        <TextInput 
        style={{height: 40, borderWidth: 2}}
        value={this.state.chatMessage}
        onChangeText={chatMessage => {
          this.setState({chatMessage})
        }} 
        onSubmitEditing={() => this.sumbitChatMessage()}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
