import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ImageBackground ,KeyboardAvoidingView
,Keyboard,
ActivityIndicator,
TouchableWithoutFeedback
} from 'react-native'
import DefaultInput from '../../components/UI/defaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.png';
import ButtonWithBackground from '../../components/UI/Buttons/ButtonWithBackGround';
import valiadtion from '../../utility/valiadtion';
import {connect} from 'react-redux';
import {tryAuth,authAutoSignIn} from '../../store /actions/index'
class AuthScreen extends Component {
    state = {
        defaultStyle: {
            pwContainerDirection: "column",
            pwContainerJustifyContent: 'flex-start',
            pwWrapperWidth: '100%'
        },
        controlls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmial: true
                },
                touched: false,
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,

                },
                touched: false,
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false,
            },
        },
        authMode:'login'
    }
    constructor(props) {
        super(props)
        Dimensions.addEventListener('change', this.rotateStyleChange);

    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.rotateStyleChange)
    }
    componentDidMount(){
        this.props.onAutoSignIn()
    }
    switAuthMode=()=>{
       this.setState({
           ...this.state.authMode,
           authMode:this.state.authMode==='login'?"signup":'login'
       }) 
    }
    rotateStyleChange = () => {


        this.setState({
            defaultStyle: {
                pwContainerDirection: Dimensions.get("window").height > 500 ? "column" : "row",
                pwContainerJustifyContent: Dimensions.get("window").height > 500 ? "flex-start" : 'space-between',
                pwWrapperWidth: Dimensions.get("window").height > 500 ? '100%' : '45%'
            }
        })

    }
    authHandler = () => {
        const authData={
            email:this.state.controlls.email.value,
            password:this.state.controlls.password.value,
        }
        console.log(this.state.authMode)
        this.props.onTryAuth(authData,this.state.authMode)
    }
    updateInputState = (key, value) => {
        let connectValue = {};
        if (this.state.controlls[key].validationRules.equalTo) {
            const equalControl = this.state.controlls[key].validationRules.equalTo;


            const equalValue = this.state.controlls[equalControl].value

            connectValue = {
                ...connectValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            const equalControl = 'password';
            const equalValue = this.state.controlls[equalControl].value
            connectValue = {
                ...connectValue,
                equalTo: equalValue
            }
        }
        this.setState({
            controlls: {
                ...this.state.controlls,
                confirmPassword: {
                    ...this.state.controlls.confirmPassword,
                    valid: key === 'password' ? valiadtion(this.state.controlls.confirmPassword.value, this.state.controlls.confirmPassword.validationRules, connectValue) :
                        this.state.controlls.confirmPassword.valid
                },
                [key]: {
                    ...this.state.controlls[key],
                    value: value,
                    valid: valiadtion(value, this.state.controlls[key].validationRules, connectValue),
                    touched: true,
                },


            }
        })

    }
    render() {
        let headingText = null;
        let confirmPasswordControl=null;
        let submitButton=(
            <ButtonWithBackground color='#29aaf4'
            disabled={!this.state.controlls.confirmPassword.valid &&this.state.authMode==='signup'||!this.state.controlls.email.valid ||!this.state.controlls.password.valid}
            onPress={this.authHandler}
        >
            submit with customer button
    </ButtonWithBackground>
        )
        if(this.props.isLoading){
            submitButton=(
                <ActivityIndicator 
                
                />
            )
        }
        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>please log in</HeadingText>
                </MainText>
            )
        }
        if(this.state.authMode==='signup'){
            confirmPasswordControl=(
                <View style={{ width: this.state.defaultStyle.pwWrapperWidth }}>

                <DefaultInput
                secureTextEntry
                    valid={this.state.controlls.confirmPassword.valid}
                    touched={this.state.controlls.confirmPassword.touched}
                    style={styles.input}
                    placeholder="ConfirmPassword"
                    value={this.state.controlls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                />
            </View>
            )
        }
        return (
            <ImageBackground source={backgroundImage}
            
                style={styles.backgroundimage}
            >
                <KeyboardAvoidingView style={styles.container}
                behavior='padding'
                >
                    {headingText}
                    <ButtonWithBackground
                        color='#29aaf4'
                        onPress={this.switAuthMode}
                    >
                        switch to {this.state.authMode==='login'?'Sign up':'Log in'}
                </ButtonWithBackground>
                <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                >

                
                    <View style={styles.inputConatiner}>

                        <DefaultInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            touched={this.state.controlls.email.touched}
                            valid={this.state.controlls.email.valid}
                            style={styles.input}
                            placeholder="email Id"
                            value={this.state.controlls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                        />
                        <View style={{
                            flexDirection: this.state.defaultStyle.pwContainerDirection,
                            justifyContent: this.state.defaultStyle.pwContainerJustifyContent
                        }}>
                            <View style={{ width: this.state.authMode==='signup'?this.state.defaultStyle.pwWrapperWidth:"100%" }}>

                                <DefaultInput
                                    touched={this.state.controlls.password.touched}
                                    valid={this.state.controlls.password.valid}
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    value={this.state.controlls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                />
                            </View>
                        {confirmPasswordControl}
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    {/* <Button title="sign up"/> */}
                    {/* <Button title='Submit'
                    onPress={this.loginHandler}
                /> */}
                {submitButton}

                </KeyboardAvoidingView>
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
    backgroundimage: {

        width: "100%",
        flex: 1,
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
    },
    inputConatiner: {
        width: '80%'
    },
    passwordContainer: {
        flexDirection: Dimensions.get('window').height > 500 ? "column" : "row",
        justifyContent: "space-between"
    },
    passwordWrapper: {
        width: Dimensions.get('window').height > 500 ? "100%" : "45%"
    }
})


const mapDispatchToProps=dispatch=>{
    return{
        onTryAuth:(authData,authMode)=>dispatch(tryAuth(authData,authMode)),
        onAutoSignIn:()=>dispatch(authAutoSignIn())
    }
}
const mapStateToProps=state=>{
    return{
        isLoading:state.ui.isLoading
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthScreen)