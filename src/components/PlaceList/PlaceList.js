import React from 'react';
import {StyleSheet,View,ScrollView,FlatList} from 'react-native';
import ListItems from '../ListItem/ListItem';
const placeList =props=>{


    return(
        <FlatList style={styles.listContainer}
        data={props.places}
        renderItem={(e)=>
            
            (
            <ListItems placeName={e.item.name} 
            placeImage={e.item.image}
            onItemTouch={()=>props.onItemSelected(e.item.key)}/>
        )}
        />
        
    )
}
export default placeList;

const styles=StyleSheet.create({
    listContainer:{
        width:"100%",
    
      }
})