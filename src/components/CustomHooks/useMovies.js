import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebouncedSearch';
export const useMovies = (searchTerm, filters, page = 1) => {
    const debouncedSearch = useDebounce(searchTerm, 300);

    return useQuery({
        queryKey: ['movies', debouncedSearch, filters, page],
        queryFn: async () => {
            const searchQuery = debouncedSearch || 'movie';
            const yearFilter = filters.year ? `&y=${filters.year}` : '';
            const typeFilter = '&type=movie';

            const response = await fetch(
                `${process.env.REACT_APP_TMDB_API_URL || process.env.REACT_APP_TMDB_API_TEST_URL}?apikey=${process.env.REACT_APP_TMDB_API_KEY}&s=${searchQuery}${yearFilter}${typeFilter}&page=${page}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();

            if (data.Response === 'False') {
                throw new Error(data.Error || 'No movies found');
            }

            return data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!debouncedSearch || searchTerm === '',
    });
};
export const useMovieDetails = (imdbID) => {
    return useQuery({
        queryKey: ['movie', imdbID],
        queryFn: async () => {
            const response = await fetch(`${process.env.REACT_APP_TMDB_API_URL || process.env.REACT_APP_TMDB_API_TEST_URL}?apikey=${process.env.REACT_APP_TMDB_API_KEY}&i=${imdbID}&plot=full`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            return data;
        },
        enabled: !!imdbID,
        staleTime: 10 * 60 * 1000,
    });
};