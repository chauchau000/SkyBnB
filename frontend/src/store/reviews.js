import { csrfFetch } from "./csrf";

//get reviews by a spot id

const GET_REVIEWS = 'reviews/getReviews'

const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews
    }
}

export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();

    if (res.ok) {
        dispatch(loadReviews(data));
    } 

}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state };
            const reviews = action.payload.Reviews; 
            newState[reviews[0].spotId] = [...reviews];
            return newState
        default:
            return state
    }
}

export default reviewsReducer;
