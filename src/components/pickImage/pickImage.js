import React from 'react';
import tempImage from '../../assets/beautiful-place.jpg'

import { View, Button, Image, StyleSheet } from 'react-native';
export default class PickImage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={tempImage}
                        style={styles.image}
                    />
                </View>
                <View style={styles.button}><Button title='pick a image' 
                onPress={()=>alert('picked image')}
                /></View>
            </View>
        )
    }
} 


const styles=StyleSheet.create({
    container:{

        width:"100%",
        alignItems:"center",
    },
    button: {
        margin: 10,

    },
    image:{
        width:"100%",
        height:'100%'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 210,
    },
})