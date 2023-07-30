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


//create review 

const CREATE_REVIEW = 'reviews/createReview';
const postReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

export const createReview = (review, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(postReview(review))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

//delete review
const DELETE_REVIEW = 'reviews/deleteReview'
const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(removeReview(reviewId))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_REVIEWS:
            const reviews = action.payload.Reviews; 
            if (reviews.length) {
                newState[reviews[0].spotId] = [...reviews];
            }
            return newState
        case CREATE_REVIEW:
            const newReview = action.payload;
            if (newState[newReview.spotId]) newState[newReview.spotId].push(newReview)
            else newState[newReview.spotId] = [newReview];
            return newState
        case DELETE_REVIEW:
            delete newState[action.payload.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer;
