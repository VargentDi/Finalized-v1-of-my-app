import React from 'react';
import { View, Button, Text,StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
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
    map: {
        width:'100%',
        height:210,
    },
})
export default class PickLocation extends React.Component {
    state={
        focusedLocation:{
            latitude:37.7900352,
            longitude:-122.4013726,
            latitudeDelta:0.0122,
            longitudeDelta:Dimensions.get('window').width/Dimensions.get("window").height*0.0122
        },
        chooseLocation:false,

    }
    pickLocationHandler=(event)=>{
        const coords=event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude:coords.latitude,
            longitude:coords.longitude,
        })
        this.setState({
            focusedLocation:{
                ...this.state.focusedLocation,
                latitude:coords.latitude,
                longitude:coords.longitude,
            },
            chooseLocation:true
        })
        this.props.onLocationPick({
            latitude:coords.latitude,
            longitude:coords.longitude
        })
    }
    getUserLocationHandler=()=>{
        
        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos);
            const coordsEvent={
                nativeEvent:{
                    coordinate:{
                        latitude:pos.coords.latitude,
                        longitude:pos.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordsEvent);
        },err=>{
            alert(err)
        });


    }
    render() {
        let marker=null;
        if(this.state.chooseLocation){
            marker=(
                <MapView.Marker 
                coordinate={this.state.focusedLocation}
                
                />
            )
        }
        return (
            <View style={styles.container}>
                <MapView 
                ref={(ref)=>this.map=ref}
                initialRegion={this.state.focusedLocation}
                style={styles.map}
                onPress={this.pickLocationHandler}
                
                >{marker}</MapView>
                <View style={styles.button}><Button title='locate me' 
                onPress={this.getUserLocationHandler}
                /></View>
            </View>
        )
    }
}