import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions,ImageBackground } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/defaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.png';
import ButtonWithBackground from '../../components/UI/Buttons/ButtonWithBackGround'
class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    render() {
        return (
            <ImageBackground source={backgroundImage}
            style={styles.backgroundimage}
            >
            <View style={styles.container}>
                <MainText>
                <HeadingText>please log in</HeadingText>
                </MainText>
                <ButtonWithBackground
                color='#29aaf4'
                onPress={()=>alert('you are trying login ')}
                >
                    switch to tologin
                </ButtonWithBackground>
                <View style={styles.inputConatiner}>

                    <DefaultInput
                        style={styles.input}
                        placeholder="your email id"
                    />
                    <DefaultInput
                        style={styles.input}
                        placeholder="Password"
                    />
                    <DefaultInput
                        style={styles.input}
                        placeholder="ConfirmPassword"
                    />
                </View>
                {/* <Button title="sign up"/> */}
                <Button title='Submit'
                    onPress={this.loginHandler}
                />
                <ButtonWithBackground color='#29aaf4'
                onPress={this.loginHandler}
                >
                    submit with customer button
                </ButtonWithBackground>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    backgroundimage:{

        width:"100%",
        flex:1,
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
    },
    inputConatiner: {
        width: '80%'
    }
})

export default AuthScreen