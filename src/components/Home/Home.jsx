import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMovies } from '../CustomHooks/useMovies';
import { SearchBar } from '../SearchBar';
import { FilterPanel } from '../FilterPanel';
import { MovieCard } from '../MovieCard';
const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ year: '' });
    const [page, setPage] = useState(1);
    const isDarkMode = useSelector(state => state.ui.isDarkMode);

    const { data, isLoading, error, refetch } = useMovies(searchTerm, filters, page);

    const movies = data?.Search || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>
                <div className="lg:w-80">
                    <FilterPanel filters={filters} onFilterChange={setFilters} />
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            )}

            {error && (
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">Failed: {error.message}</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {movies.length > 0 && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded ${page === 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span className="px-4 py-2 rounded-full border">{page}</span>

                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={!data?.Search || data.Search.length < 10}
                            className={`flex items-center gap-2 px-4 py-2 rounded ${!data?.Search || data.Search.length < 10
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </>
            )}

            {!isLoading && movies.length === 0 && (
                <div className="text-center py-12">
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Movies not found
                    </p>
                </div>
            )}
        </div>
    );
};
export default HomePage