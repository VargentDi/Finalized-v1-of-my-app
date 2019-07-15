import React, { Component } from 'react';

import { View, Text, TextInput, Button, StyleSheet, ScrollView ,Image} from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store /actions/index';
import DefaultInput from '../../components/UI/defaultInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText';
import PickImage from '../../components/pickImage/pickImage'
import PickLocation from '../../components/pickLocation/pickLoaction'
const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 210,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        margin: 10,

    },

})
class SharePlaceScreen extends Component {
    static navigatorStyle={
        navBarButtonColor:'orange'
    }
    
    state={
        controls:{
            placeName:{
                value:'',
                valid:false,
                touched:false,
                validationRules:{
                    notEmpty:true
                },
            },
            location:{
                value:null,
                valid:false,
            }
        }
    }
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    }

    onNavigatorEvent = (event) => {

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToogle") {
                this.props.navigator.toggleDrawer({
                    side: "left"

                });
            }
        }
    }
    placeAddHandler = () => {

        this.props.onAddPlace(this.state.controls.placeName.value,this.state.controls.location.value);

    }
    locationPickHandler=(location)=>{
        this.setState({
            controls:{
                ...this.state.controls,
                location:{
                    value:location,
                    valid:true
                }
            }
        })

    }
    checkPlaceValueValid=()=>{
        if(this.state.controls.placeName.value.trim().length>0){
            return true
        }
        return false;
    }
    placeNameChangeHandler=(val)=>{
        
        this.setState({
            controls:{
                ...this.state.controls,
                placeName:{
                    ...this.state.controls.placeName,
                    value:val,
                    valid:this.checkPlaceValueValid
                }
            }
        })

    }
    render() {
        console.log(!this.state.controls.location.valid)
        console.log(!this.state.controls.placeName.valid)
        console.log(!this.state.controls.location.valid || !this.state.controls.placeName.valid)
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText><HeadingText>share a place with us</HeadingText></MainText>
                    <PickImage />
                    <PickLocation 
                    onLocationPick={this.locationPickHandler}
                    />
                    <PlaceInput
                    placeData={this.state.controls.placeName}
                    onChangeText={this.placeNameChangeHandler}

                    />
                    <View style={styles.button}>
                    <Button title='share  me' 
                    disabled={!this.state.controls.placeName.valid||
                    !this.state.controls.location.valid}
                    onPress={this.placeAddHandler}
                    /></View>

                    <View style={styles.placeholder}><Text>list</Text></View>

                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName,location) => dispatch(addPlace(placeName,location))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen)