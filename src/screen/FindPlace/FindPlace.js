import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {View,Text} from 'react-native';

import PlaceList from '../../components/PlaceList/PlaceList'
class FindPlaceScreen extends Component{
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent=(event)=>{
        console.log(event)
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToogle"){
                this.props.navigator.toggleDrawer({
                    side:"left"

                });
            }
        }
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
        return(
            <View >
                <PlaceList places={this.props.places}
                onItemSelected={this.itemSelectHandler}
                />
            </View>
        )
    }
}

const mapStateToProps=state=>{
    return{
        places:state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen)