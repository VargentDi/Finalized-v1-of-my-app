/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/beautiful-place.jpg'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import {connect} from "react-redux";
import {addPlace,deletePlace,selectPlace,deselectPlace} from './src/store /actions/index'
class App extends Component {


  itemDeletedHandler = () => {
    this.props.onDeletePlace();

  }
  placeSelectHandler=(key)=>{
    this.props.onSelectPlace(key)
  }

  modalCloseHandler=()=>{
    this.props.onDeselectPlace();
  }
  placeAddHandler = (placeName) => {
    this.props.onAddPlace(placeName);
  }
  render() {

    return (
      <View style={styles.container}>
        <PlaceDetail
        selectedPlace={this.props.selectedPlace}
        onItemDeleted={this.itemDeletedHandler}
        onModalClose={this.modalCloseHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddHandler} />
        <PlaceList places={this.props.places} onItemSelected={this.placeSelectHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});

const mapStateToProps=state=>{
  return{
    places:state.places.places,
    selectedPlace:state.places.selectedPlace
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onAddPlace:(name)=>dispatch(addPlace(name)),
    onDeletePlace:()=>dispatch(deletePlace()),
    onSelectPlace:(key)=>{dispatch(selectPlace(key))},
    onDeselectPlace:()=>dispatch(deselectPlace())
  }
}
export default connect(mapDispatchToProps,mapStateToProps)(App)