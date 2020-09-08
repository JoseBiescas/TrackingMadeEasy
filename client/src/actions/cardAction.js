/*
cardAction.js (action)

Import action defitions from types.js
Uses axios to make HTTP Requests
Use dispatch to send our actions to our reducers.

*/

import axios from "axios";

import { CREATE_CARD, CARDS_LOADING } from "./types";

//Create Task
export const createCard = (cardData) => (dispatch) => {
  axios
    .post("/api/cards/create", cardData)
    .then((res) =>
      dispatch({
        type: CREATE_CARD,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Cards loading
export const setCardsLoading = () => {
    return {
      type: CARDS_LOADING
    };
  };