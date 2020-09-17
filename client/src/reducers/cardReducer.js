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
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.payload)
            };
        case UPDATE_CARD:
            let index = state.cards.findIndex(
                card => card._id === action.payload._id
            );
            state.cards.splice(index, 1);
            return {
                ...state,
                cards: [action.payload, ...state.cards]
            };
        default:
            return state;
    }
}