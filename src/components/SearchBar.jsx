import React from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
    const isDarkMode = useSelector(state => state.ui.isDarkMode);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
        </div>
    );
};