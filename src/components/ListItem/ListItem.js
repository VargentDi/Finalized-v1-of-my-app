import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
const listItem=(props)=>(
        <TouchableOpacity onPress={props.onItemTouch}>

        <View style={styles.listItem} >
            <Image
            source={props.placeImage}
            resizeMode="contain"
            style={styles.placeImage}
            />
            <Text>{props.placeName}</Text>

        </View>

        </TouchableOpacity>
    )


export default listItem;
const styles=StyleSheet.create({
    listItem:{
        width:"100%",
        padding:10,
        backgroundColor:'#eee',
        flexDirection:'row',
        alignItems:'center'
    },
    placeImage:{
        marginRight:8,
        height:30,
        width:30
    }
})