import { csrfFetch } from "./csrf";

//Login
const SET_USER = 'session/setUser';
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}
export const login = (user) => async dispatch => {
    const { credential, password } = user;
    const userRes = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    const userData = await userRes.json();
    
    if (userData) {
        const userSpotsRes = await csrfFetch('/api/users/spots')
        const userSpotsData = await userSpotsRes.json()
        const data = {...userData, ...userSpotsData}
        dispatch(setUser(data));
        return data;
    } else {
        dispatch(setUser(userData))
        return userData
    }
}

//signup
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser({user: data.user}));
    return response;
};



//Get All Spots Owned by Current User
const GET_USER_SPOTS = 'spots/getUserSpots'

const userSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    }
}

export const getUserSpots = () => async dispatch => {
    const res = await csrfFetch('/api/users/spots');
    const data = await res.json();
    
    if (res.ok) {
        dispatch(userSpots(data))
    } else {
        const errors = await res.json();
        return errors
    }
}

//Delete a Spot 

const REMOVE_SPOT = 'spots/deleteSpot'

const removeSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        payload: spotId
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = res.json()
        dispatch(removeSpot(spotId))
        return data
    } else {
        const errors = res.json()
        return errors
    }
}

//Logout
const LOGOUT_USER = 'session/removeUser';
const removeUser = () => {
    return {
        type: LOGOUT_USER,
    }
}
export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    const data = await res.json();
    dispatch(removeUser());
    return data;
}


//restore user
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser({user: data.user}));
    return response;
};

const initialState = { user: null, spots: {} }

const sessionReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_USER:
            if (action.payload) {
                const { user, Spots } = action.payload;
                newState.user = user;
                newState.spots = {}
                if (Spots) {
                    Spots.forEach( spot => {
                        newState.spots[spot.id] = spot
                    }) 
                }
            } else {
                newState.user = action.payload;
            }
            return newState;
        case LOGOUT_USER:
            newState.user = null;
            newState.spots = null;
            return newState;
        case GET_USER_SPOTS:
            newState.spots = {}
            const userSpots = action.payload.Spots;
            userSpots.forEach( spot => newState.spots[spot.id] = spot);
            return newState
        case REMOVE_SPOT:
            delete newState[action.payload.spotId]
            return newState
        default:
            return state;
    }
}

export default sessionReducer;