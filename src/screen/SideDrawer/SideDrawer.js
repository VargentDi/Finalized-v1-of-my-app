import React ,{Component}from 'react';
import {View,Text,Dimensions,StyleSheet} from 'react-native'
class SideDrawerScreen extends Component{
    
    render(){
        return(
            <View style={[styles.conatainer,{width:Dimensions.get("window").width*0.8}]}>
                <Text>
                    text drawer
                </Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    conatainer:{
        paddingTop:22,
        backgroundColor:"white",
        flex:1,
    }
})

export default SideDrawerScreen