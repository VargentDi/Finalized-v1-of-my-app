import React ,{Component}from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {authLogout} from '../../store /actions/index'
class SideDrawerScreen extends Component{
    
    render(){
        return(
            <View style={[styles.conatainer,{width:Dimensions.get("window").width*0.8}]}>
                <TouchableOpacity
                onPress={this.props.onLogout}
                >
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
const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(authLogout())
    }
}
export default connect(null,mapDispatchToProps)(SideDrawerScreen)