import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE, SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index'
export const addPlace = (placeName, location, image) => {

    return dispatch => {
        let authToken
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                dispatch(uiStopLoading())
                alert('token is wrong')
            })
            .then(token => {
                authToken=token
                return fetch("https://us-central1-ios-demo-2f47f.cloudfunctions.net/storeImage", {
                    method: "POST",
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    
                    headers:{
                        "authorization":"Bearer "+token
                    }
                })
            })
            .catch(err => {
                console.log(err)
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(data => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: data.imageUrl
                }

                return fetch('https://ios-demo-2f47f.firebaseio.com/places.json?auth='+authToken, {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                }).catch(err => {
                    dispatch(uiStopLoading())
                    console.log(err)
                }).then((data) => {
                    data.json()
                }).then((data) => {
                    dispatch(getPlaces())
                    dispatch(uiStopLoading())
                })
            })
    }
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch('https://ios-demo-2f47f.firebaseio.com/places.json?auth=' + token)
            })
            .catch(() => {
                alert('no valid token')
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        key: key,
                        image: {
                            uri: parsedRes[key].image
                        }
                    })
                }
                dispatch(setPlaces(places))
            })
            .catch(err => {
                alert('somthing went wrong');
                console.log(err)
            })


    }
}
export const setPlaces = (places) => {
    return {
        type: SET_PLACES,
        places: places,
    }
}
export const deletePlace = (key) => {
    return (dispatch) => {
        dispatch(authGetToken())
            .then(token => {
                dispatch(removePlace(key))
                return fetch('https://ios-demo-2f47f.firebaseio.com/places/' + key + '.json?auth=' + token, {
                    method: 'DELETE'
                })
            })
            .catch(() => {
                alert('no valid token find ')
            })
            .then(res => res.json)
            .then(parseJson => {
                console.log('done')
            })
            .catch(err => {
                alert('wrong')
            })

    }
}


export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    }
}