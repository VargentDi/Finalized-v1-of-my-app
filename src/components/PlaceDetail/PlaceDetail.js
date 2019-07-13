import React from 'react';
import { Modal,View ,Image,Text,Button,StyleSheet} from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';
const placeDetail = props => {
    let modal=null;
    console.log(props.selectedPlace)
    if(props.selectedPlace){
        modal=(
            <View>

            <Image source={props.selectedPlace.image} style={styles.placeImage} />
            <Text
            style={styles.placeName}
            >{props.selectedPlace.name}</Text>
            </View>

        )
    }
    return (
    <Modal 
    onRequestClose={props.onModalClose}
    visible={props.selectedPlace!==null}
    animationType='slide'
    >
        <View style={styles.modalContainer}>
            {modal}
            <View style={styles.icons}>
                <Icons name='ios-trash' color='red' size={30} />
                <Button title='delete' color='red' onPress={props.onItemDeleted}/>
                <Button title ='goback' onPress={props.onModalClose}/>
            </View>
        </View>
    </Modal>
    )
}

const styles=StyleSheet.create({
    modalContainer:{
        margin:22
    },
    placeImage:{
        width:"100%",
        height:200
    },
    placeName:{
        fontWeight:"bold",
        textAlign:"center",
        fontSize:28,
    },
    icons:{
        alignItems:"center",
    }
})
export default placeDetail;