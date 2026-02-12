import React, { useState } from "react";
import Button from "../UI/Button";
import { Search, Filter, Plus, ArrowLeft, X, Check } from "lucide-react";
import { MdPoll } from "react-icons/md";

const Header = ({ onCreatePoll, onSearch, onFilterChange }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
    onFilterChange(value);
    setShowMobileFilter(false);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col">
              <div className="flex items-center">
                <MdPoll className="text-4xl text-blue-600 mb-2" />
                <h1 className="text-2xl font-bold text-gray-900 ml-2">
                  PollMaster
                </h1>
              </div>
              <p className="text-gray-600 mt-1">
                Create and participate in polls
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search - Full input on desktop, icon on mobile */}
              <div className="relative flex-1 max-w-md">
                {/* Desktop Search */}
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search polls..."
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Mobile Search Icon */}
                <button
                  onClick={() => setShowMobileSearch(true)}
                  className="md:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Search polls"
                >
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Filter - Full dropdown on desktop, icon on mobile */}
              <div className="relative">
                {/* Desktop Filter */}
                <div className="hidden md:block relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="all">All Polls</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>

                {/* Mobile Filter Icon */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="md:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Filter polls"
                >
                  <Filter className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Create Poll - Full button on desktop, icon on mobile */}
              <Button
                variant="primary"
                onClick={onCreatePoll}
                className="hidden md:flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Poll
              </Button>

              <button
                onClick={onCreatePoll}
                className="md:hidden p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                title="Create Poll"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 left-0 right-0 bg-white p-4 shadow-lg">
            <div className="flex items-center mb-4">
              <button
                onClick={() => setShowMobileSearch(false)}
                className="mr-3 text-gray-500"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h3 className="text-lg font-medium">Search Polls</h3>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search polls..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                autoFocus
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowMobileSearch(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg mr-2 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Filter Polls</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {['all', 'active', 'closed', 'expired'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg ${filterValue === option
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize font-medium">
                      {option === 'all' ? 'All Polls' : option}
                    </span>
                    {filterValue === option && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowMobileFilter(false)}
              className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;