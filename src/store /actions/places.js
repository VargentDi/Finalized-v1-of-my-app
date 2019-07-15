import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';

export const addPlace = (placeName,location) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        location:location
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey:key,
    };
};

