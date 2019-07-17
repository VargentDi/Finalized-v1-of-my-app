import {AUTH_SET_TOKEN,AUTH_REMOVE_TOKEN} from '../actions/actionTypes'

const initialState={
    token:null,
    expirDate:null,
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case AUTH_SET_TOKEN:
            return{
                ...state,
                token:action.token,
                expirDate:action.expirDate

            }
        case AUTH_REMOVE_TOKEN:
            return{
                ...state,
                token:null,
                expirDate:null,
            }
        default:
            return state
    }
}


export default reducer