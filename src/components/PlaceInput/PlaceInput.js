import React from 'react';
import DefaultInput from '../UI/defaultInput'
import { View, TextInput, Button, StyleSheet } from 'react-native'
const PlaceInput = (props) =>(
    <DefaultInput value={props.placeData.value}
    
      placeholder='type me'
      onChangeText={props.onChangeText}
    />
)

export default PlaceInput;

