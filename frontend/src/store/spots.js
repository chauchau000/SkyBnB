import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots'


const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

export const spots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    const data = await res.json();
    dispatch(getAllSpots(data));
    return data
}




const initialState = {}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_SPOTS:
            return action.payload
        default:
            return state
    }
}

export default spotsReducer;
