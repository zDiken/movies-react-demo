import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { ChartFactory } from './ChartFactory';
import { MovieCard } from './MovieCard';

export const FavoritesDashboard = () => {
    const favorites = useSelector(state => state.favorites?.items || []);
    const isDarkMode = useSelector(state => state.ui?.isDarkMode || false);

    // Analytics data with better error handling
    const genreData = useMemo(() => {
        if (!Array.isArray(favorites) || favorites.length === 0) {
            return [];
        }

        const genreCounts = {};

        favorites.forEach(movie => {
            if (movie && movie.Genre && typeof movie.Genre === 'string') {
                movie.Genre.split(', ').forEach(genre => {
                    const trimmedGenre = genre.trim();
                    if (trimmedGenre) {
                        genreCounts[trimmedGenre] = (genreCounts[trimmedGenre] || 0) + 1;
                    }
                });
            }
        });

        return Object.entries(genreCounts)
            .map(([name, value]) => ({ name, value }))
            .filter(item => item.name && item.value > 0)
            .sort((a, b) => b.value - a.value); // Sort by count descending
    }, [favorites]);

    const yearData = useMemo(() => {
        if (!Array.isArray(favorites) || favorites.length === 0) {
            return [];
        }

        const yearCounts = {};

        favorites.forEach(movie => {
            if (movie && movie.Year) {
                const year = parseInt(movie.Year);
                if (!isNaN(year) && year > 1900 && year <= new Date().getFullYear()) {
                    const decade = Math.floor(year / 10) * 10;
                    const label = `${decade}s`;
                    yearCounts[label] = (yearCounts[label] || 0) + 1;
                }
            }
        });

        return Object.entries(yearCounts)
            .map(([name, value]) => ({ name, value }))
            .filter(item => item.name && item.value > 0)
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort by decade
    }, [favorites]);

    if (!Array.isArray(favorites) || favorites.length === 0) {
        return (
            <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start adding movies to your favorites to see analytics here!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Favorites Movies Dashboard</h2>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className='text-yellow-500 mr-1 font-bold'>
                        {favorites.length} -
                    </span>
                    {favorites.length === 1 ? 'Movie' : 'Movies'} in collection
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-semibold mb-4">Genre Distribution</h3>
                    {genreData.length > 0 ? (
                        ChartFactory.createChart('pie', genreData)
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500">No genre data available</p>
                        </div>
                    )}
                </div>

                <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-semibold mb-4">Movies by Decade</h3>
                    {yearData.length > 0 ? (
                        ChartFactory.createChart('bar', yearData)
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500">No year data available</p>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-semibold mb-6">Favorite Movies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.imdbID || movie.Title} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};