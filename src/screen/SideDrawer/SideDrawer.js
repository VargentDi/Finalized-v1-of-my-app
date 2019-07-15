import React ,{Component}from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
class SideDrawerScreen extends Component{
    
    render(){
        return(
            <View style={[styles.conatainer,{width:Dimensions.get("window").width*0.8}]}>
                <TouchableOpacity>
                    <View
                    style={styles.drawerIcon}
                    >
                        <Icon 
                        name={Platform.OS==='android'?"md-log-out":'ios-log-out'}
                        size={30}
                        color='#aaa'
                        style={styles.signoutIcon}
                        />
                        <Text>sign out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    conatainer:{
        paddingTop:40,
        backgroundColor:"white",
        flex:1,
    },
    drawerIcon:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        backgroundColor:'#eee',

        
    },
    signoutIcon:{
        marginRight:10,
        
    }
})

export default SideDrawerScreen