import React from 'react';
import { useSelector } from 'react-redux';
import { Filter } from 'lucide-react';

export const FilterPanel = ({ filters, onFilterChange }) => {
    const isDarkMode = useSelector(state => state.ui.isDarkMode);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Filters</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Release Year</label>
                    <select
                        value={filters.year}
                        onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
                        className={`w-full p-2 rounded border ${isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                    >
                        <option value="">All Years</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};