import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet,TouchableOpacity,Platform } from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store /actions/index'
class PlaceDetail extends React.Component{

    deletHandler=()=>{
        console.log('hi')
        this.props.onDeletPlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
    }

    render(){

    
    return (

        <View style={styles.container}>
            <View>

                <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                <Text
                    style={styles.placeName}
                >{this.props.selectedPlace.name}</Text>
            </View>
            <View style={styles.icons}>
                <TouchableOpacity onPress={this.deletHandler}>

                <Icons name={Platform.OS==='android'?"md-trash":'ios-trash'} color='red' size={30} />
                </TouchableOpacity>
                <Button title='goback' onPress={this.props.onModalClose} />
            </View>
        </View>

    )}
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
    },
    icons: {
        alignItems: "center",
    }
})

const mapDispatchToProps=dispatch=>{
    return{
        onDeletPlace:key=>dispatch(deletePlace(key))
    }
}
export default connect(null,mapDispatchToProps)(PlaceDetail);

