/*
setAuthToken.js (utils)

Sets and deletes the Authorization header for
our axios requests depending on whether a user is logged in or not.
*/
import axios from "axios";

const setAuthToken = token => {
    if (token) {
        //Apply auth token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;