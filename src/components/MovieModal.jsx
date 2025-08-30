import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Heart, X } from 'lucide-react';
import { useMovieDetails } from './CustomHooks/useMovies';
import { useFavorites } from './CustomHooks/useFavorites';
import { uiSlice } from '../Redux/Slices/uiSlice';

export const MovieModalComponent = () => {
    const dispatch = useDispatch();
    const selectedMovieId = useSelector(state => state.ui.selectedMovie);
    const isModalOpen = useSelector(state => state.ui.isModalOpen);
    const isDarkMode = useSelector(state => state.ui.isDarkMode);
    const { data: movie, isLoading, error } = useMovieDetails(selectedMovieId);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    if (!isModalOpen || !selectedMovieId) return null;

    const closeModal = () => {
        dispatch(uiSlice.actions.setSelectedMovie(null));
    };

    const handleFavoriteClick = () => {
        if (isFavorite(movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <button
                    onClick={closeModal}
                    className="absolute top-0.5 right-0.5 z-10 text-white/70 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                {isLoading && (
                    <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="p-8 text-center">
                        <p className="text-red-500">Failed to load movie details</p>
                    </div>
                )}

                {movie && (
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/400/600'}
                                alt={movie.Title}
                                className="w-full h-full object-fill"
                            />
                        </div>

                        <div className="md:w-2/3 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-3xl font-bold">{movie.Title}</h2>
                                <button
                                    onClick={handleFavoriteClick}
                                    className={`p-2 rounded-full ${isFavorite(movie.imdbID)
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${isFavorite(movie.imdbID) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <span>{movie.Year}</span>
                                    <span>{movie.Runtime}</span>
                                    <span>{movie.Genre}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{movie.imdbRating}/10</span>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        ({movie.imdbVotes} votes)
                                    </span>
                                </div>

                                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {movie.Plot}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Director</h4>
                                        <p>{movie.Director}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Writer</h4>
                                        <p>{movie.Writer}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Actors</h4>
                                        <p>{movie.Actors}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Language</h4>
                                        <p>{movie.Language}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};