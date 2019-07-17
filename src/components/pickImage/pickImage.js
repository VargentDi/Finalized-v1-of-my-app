import React from 'react';
import tempImage from '../../assets/beautiful-place.jpg';
import ImagePicker from 'react-native-image-picker'

import { View, Button, Image, StyleSheet } from 'react-native';
export default class PickImage extends React.Component {
    state={
        pickedImage:null,

    }
    pickedImageHandler=()=>{
        ImagePicker.showImagePicker({title:'pick an image'},res=>{
            if(res.didCancel){
                console.log('User Cancelled')
            }else if(res.error){
                console.log('err',res.error)
            }else{
                this.setState({
                    pickedImage:{uri:res.uri,base64:res.data}
                })
                this.props.onImagePicked(this.state.pickedImage)
            }
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage}
                        style={styles.image}
                    />
                </View>
                <View style={styles.button}><Button title='pick a image' 
                onPress={this.pickedImageHandler}
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