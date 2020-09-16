/*
cardAction.js (action)

Import action defitions from types.js
Uses axios to make HTTP Requests
Use dispatch to send our actions to our reducers.

*/

import axios from "axios";

import { CREATE_CARD, CARDS_LOADING, GET_CARDS, DELETE_CARD } from "./types";

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

//Get Cards
export const getCards = (userID) => (dispatch) => {
  dispatch(setCardsLoading());
  axios
    .get("/api/cards/view-cards", userID)
    .then((res) =>
      dispatch({
        type: GET_CARDS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_CARDS,
        payload: null,
      })
    );
};

//Delete Card
export const deleteCard = (cardID) => (dispatch) => {
  axios
    .delete(`/api/cards/delete-card/${cardID}`)
    .then(res =>
      dispatch({
        type: DELETE_CARD,
        payload: cardID
      })
      )
      .catch(err=> console.log(err))
}

// Cards loading
export const setCardsLoading = () => {
  return {
    type: CARDS_LOADING,
  };
};
