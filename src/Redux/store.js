import { configureStore } from '@reduxjs/toolkit';
import { favoritesSlice } from './Slices/favoritesSlice';
import { uiSlice } from './Slices/uiSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
        ui: uiSlice.reducer,
    }
});