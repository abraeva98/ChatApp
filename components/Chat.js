import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Platform } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      chatMessage: '',
      chatMessages: []
    }
  }
  componentDidMount() {
    this.socket = io("http://192.168.1.7:3000");
    this.socket.on('chat message', msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]})
    })
  }
  sumbitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage)
    this.setState({chatMessage: ''})
  }
  render () {
    const chatMessages = this.state.chatMessages.map(msg => (<Text key={msg.id}>{msg}</Text>))
    return (
      <SafeAreaView style={styles.container}>
        {chatMessages}
        <Text>Say 'Hi'</Text>
        <TextInput style={styles.chat}
        style={{height: 40, borderWidth: 2, top: 300}}
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
  }
});