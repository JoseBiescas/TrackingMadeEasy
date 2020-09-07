import {
    CREATE_CARD,
    DELETE_CARD,
    UPDATE_CARD,
    CARDS_LOADING
} from "../actions/types";

const initialState ={
    cards: [],
    cardsLoading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_CARD:
            return {
                ...state,
                cards: [action.payload, ...state.cards]
            };
        case CARDS_LOADING:
            return {
                ...state,
                cardsLoading: true
            };
        default:
            return state;
    }
}