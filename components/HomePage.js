import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Button, ImageBackground } from 'react-native';

export default class HomePage extends React.Component {
    render() {
        const image = { uri: 'https://fsb.zobj.net/crop.php?r=56V4ks797mFqyW03ZF9wb2hxM7MXKEbuhpvnMeRcbMbnoHfjzu_9MhEMoDPcwhi2e3bcWGt3SgkM5o9OZlUGvzlli5uWBPDpC7TurOLWWlnsPC7IJB5OWhuPP4OO5iDcGpy3xldIhPtht5arZuzCIPFt5nuZMhS2YYoFEYxyJ_ouzZccd9MMVOV3PCg8wuTdofZf_zf8WRMoFI7L'}
        return (
            <SafeAreaView style={styles.container}> 
                <ImageBackground source={image} style={styles.image} >
                    <Text style={styles.text}>Goofy Chat</Text>
                </ImageBackground>
                     <Button onPress={() => this.props.navigation.navigate('Login')} 
                      title="Login" style={styles.startButton}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "column"
    }, 
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    startButton: {
        width: '100%',
        height: 70,
        backgroundColor: 'orange',
        justifyContent: "center",
    }, 
    text: {
        fontSize: 40,
        justifyContent: 'flex-start',
    }
})