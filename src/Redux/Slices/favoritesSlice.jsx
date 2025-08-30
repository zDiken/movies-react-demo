import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: JSON.parse(localStorage.getItem('movieFavorites') || '[]')
    },
    reducers: {
        addFavorite: (state, action) => {
            const movie = action.payload;
            if (!state.items.find(fav => fav.imdbID === movie.imdbID)) {
                state.items.push(movie);
                localStorage.setItem('movieFavorites', JSON.stringify(state.items));
            }
        },
        removeFavorite: (state, action) => {
            const imdbID = action.payload;
            state.items = state.items.filter(fav => fav.imdbID !== imdbID);
            localStorage.setItem('movieFavorites', JSON.stringify(state.items));
        }
    }
});