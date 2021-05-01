/*
Reducers specify how the application state
should change in response to an action.
Reducers respond with the new state, which is 
passed to our store and, in turn, our UI.
*/
import {
    SET_CURRENT_USER,
    USER_LOADING,
    CREATE_LABEL
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case CREATE_LABEL:
            return {
                ...state,
                user: {
                    ...state.user,
                    labels: [...state.user.labels, action.payload]
                }
            }
        default:
            return state;
    }
}