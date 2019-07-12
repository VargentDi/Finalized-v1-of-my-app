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
export default class App extends Component {
  state = {
    places: [],
    selectedPlace:null,
  }

  itemDeletedHandler = () => {
    this.setState({
      ...this.state,
      places: this.state.places.filter(e=> {
        return e.key!== this.state.selectedPlace.key;
      }),
      selectedPlace:null,
    })

  }
  placeSelectHandler=(key)=>{
    this.setState({
      ...this.state,
      selectedPlace:this.state.places.find(e=>{
        return e.key===key;
      })
    })
  }

  modalCloseHandler=()=>{
    this.setState({
      selectedPlace:null,
    })
  }
  placeAddHandler = (placeName) => {
    this.setState({
      ...this.state,
      places: this.state.places.concat({
        key: Math.random(), 
        name: placeName,
        image:{uri:'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg'}
      }),
    })
  }
  render() {

    return (
      <View style={styles.container}>
        <PlaceDetail
        selectedPlace={this.state.selectedPlace}
        onItemDeleted={this.itemDeletedHandler}
        onModalClose={this.modalCloseHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectHandler} />
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
