import React, { useState } from 'react';
import { Search, Loader2, Send } from 'lucide-react';

interface SearchInterfaceProps {
  onQuery: (query: string) => void;
  isLoading: boolean;
  currentQuery: string;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ 
  onQuery, 
  isLoading, 
  currentQuery 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onQuery(query.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Ask About Freshservice API
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get instant answers with code examples, parameter details, and direct citations 
          from the official documentation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Give me the curl command to create a ticket"
            className="w-full pl-12 pr-16 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <div className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </div>
          </button>
        </div>
      </form>

      {isLoading && currentQuery && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
            <div>
              <p className="text-indigo-800 font-medium">
                Searching documentation for: "{currentQuery}"
              </p>
              <p className="text-indigo-600 text-sm">
                Analyzing content and generating response...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;