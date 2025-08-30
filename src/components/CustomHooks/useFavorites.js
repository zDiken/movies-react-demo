import { useSelector, useDispatch } from 'react-redux';
import { favoritesSlice } from '../../Redux/Slices/favoritesSlice';

export const useFavorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);

    const addFavorite = (movie) => {
        dispatch(favoritesSlice.actions.addFavorite(movie));
    };

    const removeFavorite = (imdbID) => {
        dispatch(favoritesSlice.actions.removeFavorite(imdbID));
    };

    const isFavorite = (imdbID) => {
        return favorites.some(fav => fav.imdbID === imdbID);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };
};