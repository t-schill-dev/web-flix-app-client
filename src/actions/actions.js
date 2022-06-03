export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_FAVORITES = 'SET_FAVORITES';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
export const SET_USER = 'SET_USER';

//ACTION CREATOR
export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setFavorites(value) {
    return { type: SET_FAVORITES, value };
}

export function toggleFavorites(movieId) {
    return { type: TOGGLE_FAVORITES, movieId };
}

export function setUser(user) {
    return { type: SET_USER, user };
}