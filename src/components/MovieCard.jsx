import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Play } from 'lucide-react';
import { uiSlice } from '../Redux/Slices/uiSlice';
import { useFavorites } from './CustomHooks/useFavorites';

export const MovieCard = ({ movie }) => {
    const isDarkMode = useSelector(state => state.ui.isDarkMode);
    const dispatch = useDispatch();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const isMovieFavorite = isFavorite(movie.imdbID);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (isMovieFavorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    const handleCardClick = () => {
        dispatch(uiSlice.actions.setSelectedMovie(movie.imdbID));
    };

    return (
        <div
            onClick={handleCardClick}
            className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
        >
            <div className="aspect-[2/3] overflow-hidden">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = '/api/placeholder/300/450';
                    }}
                />
            </div>

            <div className="absolute top-2 right-2">
                <button
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-full transition-all duration-200 ${isMovieFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-black/50 text-white hover:bg-red-500'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isMovieFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {movie.Year}
                </p>
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    );
};