import axios from "axios";
import { set } from "mongoose";

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