import React, { useState } from 'react';
import Button from '../UI/Button';
import { useForm } from '../../hooks/useForm';
import { validatePollForm } from '../../utils/validators';

const PollCreator = ({ onSubmit }) => {
  const [pollType, setPollType] = useState('single');
  const [options, setOptions] = useState(['', '']);
  
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      question: '',
      expiresAt: '',
    },
    validate: (values) => validatePollForm(values, options),
    onSubmit: (values) => {
      const pollData = {
        ...values,
        type: pollType,
        options: options.filter(opt => opt.trim() !== ''),
        createdAt: new Date().toISOString(),
      };
      onSubmit(pollData);
    }
  });

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Poll Question *
        </label>
        <textarea
          name="question"
          value={values.question}
          onChange={handleChange}
          placeholder="What would you like to ask?"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.question ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Poll Type
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={pollType === 'single'}
              onChange={() => setPollType('single')}
              className="text-blue-600"
            />
            <span className="ml-2">Single Choice</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={pollType === 'multiple'}
              onChange={() => setPollType('multiple')}
              className="text-blue-600"
            />
            <span className="ml-2">Multiple Choice</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options *
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.options ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.options && (
            <p className="text-sm text-red-600">{errors.options}</p>
          )}
        </div>
        {options.length < 10 && (
          <button
            type="button"
            onClick={addOption}
            className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add Option
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expiration Date & Time *
        </label>
        <input
          type="datetime-local"
          name="expiresAt"
          value={values.expiresAt}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 16)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.expiresAt ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.expiresAt && (
          <p className="mt-1 text-sm text-red-600">{errors.expiresAt}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit" variant="primary">
          Create Poll
        </Button>
      </div>
    </form>
  );
};

export default PollCreator;