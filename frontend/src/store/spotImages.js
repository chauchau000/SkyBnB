import { csrfFetch } from "./csrf";

const CREATE_SPOTIMAGE = 'spotImages/createSpotImage'

const postSpotImage = (spotImage) => {
    return {
        type: CREATE_SPOTIMAGE,
        payload: spotImage
    }
}

export const createSpotImage = (image, spotId) => async dispatch => {
    const res = await csrfFetch(`spots/${spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(postSpotImage(data));
        return data
    } else {
        const errors = res.json();
        return errors
    }
}


const initialState = {}

const spotImagesReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case CREATE_SPOTIMAGE:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}

export default spotImagesReducer;
