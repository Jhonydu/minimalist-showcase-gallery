
import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterBar = ({ categories, selectedCategory, onSelectCategory }: FilterBarProps) => {
  return (
    <div className="fixed top-24 left-6 z-10 py-3 pointer-events-auto">
      <div className="flex items-center space-x-3">
        <Filter className="h-4 w-4 text-white/60" />
        <div className="flex items-center">
          {categories.map((category, idx) => (
            <React.Fragment key={category}>
              {idx > 0 && <span className="text-white/30 mx-1">|</span>}
              <button
                onClick={() => onSelectCategory(category)}
                className={cn(
                  "px-1 py-1 text-xs uppercase transition-colors",
                  selectedCategory === category
                    ? 'text-white font-medium underline underline-offset-4'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {category}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
