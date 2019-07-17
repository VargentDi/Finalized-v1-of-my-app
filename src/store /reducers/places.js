import {DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE,SET_PLACES,REMOVE_PLACE,PLACE_ADDED,START_ADD_PLACE} from '../actions/actionTypes'
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_PLACES:
            return{
                ...state,
                places:action.places
            }
        case REMOVE_PLACE:
            return{
                ...state,
                places:state.places.filter(e=>{
                    return e.key!==action.key;
                }),
            };
        case START_ADD_PLACE:
            return{
                ...state,
                placeAdded:false,
            };
        case PLACE_ADDED:
            return{
                ...state,
                placeAdded:true,
            };
        default:
            return state;
    
    }
};

const initialState={
    places: [],
    placeAdded:false,
}
export default reducer