import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterOption } from '../types';

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (key: string, value: string) => void;
  filterOptions: FilterOption[];
  placeholder?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearchChange, 
  onFilterChange, 
  filterOptions, 
  placeholder = "Suchen..." 
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
          placeholder={placeholder}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        {filterOptions.map((filter) => (
          <div key={filter.key} className="relative min-w-[140px] flex-1 md:flex-none">
            <select
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="appearance-none w-full bg-surface border border-gray-300 text-dark py-2.5 pl-4 pr-8 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;