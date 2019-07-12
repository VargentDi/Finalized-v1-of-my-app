import React from 'react';

import {View,TextInput,Button,StyleSheet} from 'react-native'
class PlaceInput extends React.Component{
    state={
        placeName:'',
    }
    placeNameChangeHandler=(val)=>{
        this.setState({
          placeName:val,
        })
      }
    
      placeSubmiteHandler=()=>{
        if(this.state.placeName.trim()===""){
          return;
        }
        this.props.onPlaceAdded(this.state.placeName)
      }
    render(){
        return(
            <View style={styles.inputContainer}>

            <TextInput style={styles.placeInput} 
            value={this.state.placeName}  
            onChangeText={this.placeNameChangeHandler} 
            placeholder='search your dream place'/>
            <Button 
            title='add'
            style={styles.placeButton}
            onPress={this.placeSubmiteHandler}
            />
            </View>
        )
    }
}
export default PlaceInput;

const styles=StyleSheet.create({
    inputContainer:{
        // flex:1,
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    
      },
      placeInput:{
        width:"70%"
      },
      placeButton:{
        width:"30%"
      },
})