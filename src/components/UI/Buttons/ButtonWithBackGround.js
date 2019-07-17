import React from 'react';
import {TouchableOpacity,TouchableNativeFeedback,Text,View,StyleSheet,Platform} from 'react-native'
const buttonWithBackground =props=>{
    const content=(
        <View style={[styles.button,{backgroundColor:props.color},props.disabled?styles.disable:null]}>
        <Text
        style={props.disabled?styles.disableText:null}
        >
            {props.children}
        </Text>
    </View>
    )
    if(Platform.OS==='android'){
        return(
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    // if(props.disabled){
    //     return content
    // }
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button,{backgroundColor:props.color},props.disabled?styles.disable:null]}>
                <Text style={props.disabled?styles.disableText:null}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    button:{
        padding:10,
        margin:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:'black'
    },
    disable:{
        backgroundColor:'#eee',
        borderColor:'#aaa'
    },
    disableText:{
        color:'#aaa'
    }
})

export default buttonWithBackground