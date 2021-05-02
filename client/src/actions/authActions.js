/* 
authActions.js (actions)

Import action defitions from types.js
Uses axios to make HTTP Requests
Use dispatch to send our actions to our reducers.

*/

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { CLEAR_CARD, CREATE_LABEL, GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//Register
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("api/users/register", userData)
        .then(res => history.push("/login")) //redirect ot login on successfull registration
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Login
export const loginUser = userData => dispatch => {
    axios
        .post("api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            sessionStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded)); //Sending action to reducer
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Create Label
export const createLabel = (data) => (dispatch) => {
    let res;
    const { user_id } = data;
    delete data.user_id;
    res = axios.patch(`api/users/create_label/${user_id}`, data)
    .then((res) => {
        dispatch({
            type: CREATE_LABEL,
            payload: data.label
        })
    });
    return res;
}

//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//User load
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//Log user out
export const logoutUser = () => dispatch => {
    sessionStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch({type: CLEAR_CARD});
};