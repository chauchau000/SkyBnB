import { csrfFetch } from "./csrf";


//Get All Spots
const GET_ALL_SPOTS = 'spots/getAllSpots'

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}
export const spots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllSpots(data));
    } else {
        const errors = await res.json();
        return errors
    }
}


///Get Spot Details
const GET_SPOT_DETAILS = 'spots/getSpotDetails'
const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        payload: spot
    }
}

export const spotDetails = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    const data = await res.json();
    
    if (res.ok) {
        dispatch(getSpotDetails(data));
    } else {
        const errors = await res.json();
        return errors
    }
}

//Create new spot

const CREATE_NEW_SPOT = 'spots/createNewSpot'
const postNewSpot = (spot) => {
    return {
        type: CREATE_NEW_SPOT,
        payload: spot
    }
}

export const createNewSpot = (spot) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(postNewSpot(data));
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

//Edit a spot 

const UPDATE_SPOT = 'spots/updateSpot'
const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

export const updateSpot = (spot, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(editSpot(data));
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}



const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state}
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = {};
            action.payload.Spots.forEach( (spot ) => {
                newState[spot.id] = spot
            })
            return newState
        case GET_SPOT_DETAILS:
            const currentSpot = action.payload
            newState[currentSpot.id] = currentSpot
            return newState
        case CREATE_NEW_SPOT:
            const newSpot = action.payload;
            newState[newSpot.id] = newSpot;
            return newState;
        case UPDATE_SPOT:
            const updatedSpot = action.payload;
            newState[updatedSpot.id] = updatedSpot;
            return newState
        default:
            return state
    }
}

export default spotsReducer;
