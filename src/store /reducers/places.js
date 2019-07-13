import {ADD_PLACE,DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE} from '../actions/actionTypes'
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_PLACE:
            return {
                ...state,
                places:state.places.concat({
                    key: Math.random(), 
                    name: action.placeName,
                    image:{uri:'https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg'}
                  })
            }
        case DELETE_PLACE:
            return{
                ...state,
                places:state.places.filter(e=>{
                    return e.key!==action.placeKey;
                }),
            };

        default:
            return state;
    
    }
};

const initialState={
    places: [],

}
export default reducer