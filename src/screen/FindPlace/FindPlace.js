import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {View,Text,TouchableOpacity,StyleSheet,Animated} from 'react-native';
import {getPlaces} from '../../store /actions/index'
import PlaceList from '../../components/PlaceList/PlaceList'
class FindPlaceScreen extends Component{
    static navigatorStyle={
        navBarButtonColor:'orange'
    }
    state={
        placesLoaded:false,
        removeAnim:new Animated.Value(1),
        placesAnim:new Animated.Value(0)
    }
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent=(event)=>{
        if(event.type==='ScreenChangedEvent'){
            if(event.id==='willAppear'){
                this.props.onLoadPlaces();
            }
        }
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToogle"){
                this.props.navigator.toggleDrawer({
                    side:"left"

                });
            }
        }
    }
    placesSearchHandler=()=>{
        Animated.timing(this.state.removeAnim,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start(()=>{
            this.setState({
                placesLoaded:true,
            })
            this.placesLoadHandler()
        })
    }

    placesLoadHandler=()=>{
        Animated.timing(this.state.placesAnim,{
            toValue:1,
            duration:500,
            useNativeDriver:true
        }).start()
    }
    itemSelectHandler=(key)=>{
        const sel=this.props.places.find(e=>{
            return e.key===key
        });
        this.props.navigator.push({
            screen:"finalyProject-places.SelectDetailScreen",
            title:sel.name,
            passProps:{
                selectedPlace:sel
            }
        })
    }
    render(){
        let content=(
            <Animated.View
            style={{opacity:this.state.removeAnim,
            transform:[{
                scale:this.state.removeAnim.interpolate({
                    inputRange:[0,1],
                    outputRange:[12,1]
                })
            }]
            }}
            >

            <TouchableOpacity
            onPress={this.placesSearchHandler}
            >
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>
                        find places
                    </Text>
                </View>
            </TouchableOpacity>
            </Animated.View>
        )
        if(this.state.placesLoaded){

            content=(
                <Animated.View
                style={{
                    opacity:this.state.placesAnim,    
                }}
                >
                    <PlaceList places={this.props.places}
                    onItemSelected={this.itemSelectHandler}
                    />
                </Animated.View>
            )
        }
        return(
            <View style={this.state.placesLoaded?null:styles.buttonContainer}>
                {content}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    buttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    
    searchButton:{
        borderColor:'orange',
        borderWidth:3,
        borderRadius:15,
        padding:20,
    },
    searchButtonText:{
        color:'orange',
        fontWeight:"bold",
        fontSize:26
    }
})

const mapStateToProps=state=>{
    return{
        places:state.places.places
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onLoadPlaces:()=>dispatch(getPlaces())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FindPlaceScreen)