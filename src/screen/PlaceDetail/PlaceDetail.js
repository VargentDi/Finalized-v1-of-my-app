import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store /actions/index'
import MapView from 'react-native-maps';
class PlaceDetail extends React.Component {

    deletHandler = () => {
        console.log('hi')
        this.props.onDeletPlace(this.props.selectedPlace.key)
        this.goBackHandler()
    }
    goBackHandler = () => {
        this.props.navigator.pop()
    }

    render() {

        return (

            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                </View>
                <View style={{padding:2,width:"100%"}}>
                    <MapView
                        style={{
                            width: '100%',
                            height: 210,
                        }}
                        initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122

                        }}
                    >
                        <MapView.Marker
                            coordinate={this.props.selectedPlace.location}
                        />
                    </MapView>
                </View>
                <View style={styles.icons}>
                    <Text
                        style={styles.placeName}
                    >{this.props.selectedPlace.name}</Text>
                    <TouchableOpacity onPress={this.deletHandler}>

                        <Icons name={Platform.OS === 'android' ? "md-trash" : 'ios-trash'} color='red' size={30} />
                    </TouchableOpacity>
                    <Button title='goback' onPress={this.goBackHandler} />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
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

const mapDispatchToProps = dispatch => {
    return {
        onDeletPlace: key => dispatch(deletePlace(key))
    }
}
export default connect(null, mapDispatchToProps)(PlaceDetail);

