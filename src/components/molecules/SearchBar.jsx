import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search players...', 
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          className="pr-20"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 flex items-center px-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </button>
        )}
        
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 bg-primary hover:bg-blue-600 text-white rounded-r-lg transition-colors"
        >
          <ApperIcon name="Search" className="w-4 h-4" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;