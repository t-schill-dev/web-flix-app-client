import { combineReducers } from 'redux';
import {
    SET_FILTER,
    SET_MOVIES,
    SET_FAVORITES,
    TOGGLE_FAVORITES,
    SET_USER
} from '../actions/actions';

//fitering movies
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function favorites(state = [], action) {
    switch (action.type) {
        case SET_FAVORITES:
            return action.value;
        case TOGGLE_FAVORITES:
            if (state.includes(action.movieId)) {
                return state.filter((val) => val !== action.movieId);
            } else {
                return [...state, action.movieId];
            }
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}

//Combine functions to export
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    favorites,
    user
});


export default moviesApp;