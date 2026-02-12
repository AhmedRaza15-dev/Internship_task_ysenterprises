import React, { useState } from 'react';
import Button from '../UI/Button';

const PollVote = ({ poll, onVote, onCancel }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    poll.type === 'single' ? null : []
  );
  const [error, setError] = useState('');

  const handleOptionSelect = (optionId) => {
    if (poll.type === 'single') {
      setSelectedOptions(optionId);
      setError('');
    } else {
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        } else if (prev.length < 5) {
          return [...prev, optionId];
        }
        return prev;
      });
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!selectedOptions || (poll.type === 'multiple' && selectedOptions.length === 0)) {
      setError('Please select at least one option');
      return;
    }
    onVote(poll.id, selectedOptions);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{poll.question}</h3>
      
      <div className="space-y-3">
        {poll.options.map((option) => {
          const isSelected = poll.type === 'single' 
            ? selectedOptions === option.id
            : selectedOptions.includes(option.id);

          return (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                  poll.type === 'single'
                    ? 'rounded-full'
                    : 'rounded'
                } ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                  {isSelected && poll.type === 'single' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                  {isSelected && poll.type === 'multiple' && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{option.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Vote
        </Button>
      </div>
    </div>
  );
};

export default PollVote;