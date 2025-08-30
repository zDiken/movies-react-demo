import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDarkMode: localStorage.getItem('darkMode') === 'true',
        selectedMovie: null,
        isModalOpen: false,
        currentView: 'home'
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('darkMode', state.isDarkMode);
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
            state.isModalOpen = !!action.payload;
        },
        setCurrentView: (state, action) => {
            state.currentView = action.payload;
        }
    }
});