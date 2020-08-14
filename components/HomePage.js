import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

export default class HomePage extends React.Component {
    render() {
        return (
            <Text>Hello</Text>
            // <ImageBackground style={styles.background} source={require('../bacdground.jpg')}>

            // </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        justifyContent: 'flex-end'
    }, 
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'pink',
    }
})