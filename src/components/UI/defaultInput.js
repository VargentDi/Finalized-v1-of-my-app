import React from 'react';
import {TextInput,StyleSheet} from 'react-native'

const defaultInput =props=>(
    <TextInput 
    {...props}
    style={[styles.input,props.style,!props.valid&&props.touched?styles.inValid:null]}
    // underlineColorAndroid='transparent'

    
    />
)

const styles=StyleSheet.create({
    input: {
        width: '100%',
        borderWidth:1,
        borderColor:"#fff",
        padding:5,
        marginBottom:8,
        marginTop:8

    },
    inValid:{
        backgroundColor:'#f9c0c0',
        borderColor:'red'
    }
})
export default defaultInput