import { useState, useEffect, useCallback } from 'react';

export const usePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API functions - Replace with real API calls
  const fetchPolls = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockPolls = JSON.parse(localStorage.getItem('polls') || '[]');
      setPolls(mockPolls);
      setError(null);
    } catch (err) {
      setError('Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPoll = async (pollData) => {
    try {
      const newPoll = {
        id: Date.now().toString(),
        ...pollData,
        options: pollData.options.map((text, index) => ({
          id: index.toString(),
          text,
          votes: 0
        })),
        totalVotes: 0
      };

      const updatedPolls = [...polls, newPoll];
      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setPolls(updatedPolls);
      return newPoll;
    } catch (err) {
      setError('Failed to create poll');
      throw err;
    }
  };

  const voteOnPoll = async (pollId, selectedOptions) => {
    try {
      const updatedPolls = polls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(option => {
            const isSelected = Array.isArray(selectedOptions)
              ? selectedOptions.includes(option.id)
              : selectedOptions === option.id;
            
            return isSelected 
              ? { ...option, votes: (option.votes || 0) + 1 }
              : option;
          });

          const voteCount = Array.isArray(selectedOptions) 
            ? selectedOptions.length 
            : 1;

          return {
            ...poll,
            options: updatedOptions,
            totalVotes: (poll.totalVotes || 0) + voteCount
          };
        }
        return poll;
      });

      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setPolls(updatedPolls);
    } catch (err) {
      setError('Failed to submit vote');
      throw err;
    }
  };

  const deletePoll = async (pollId) => {
    try {
      const updatedPolls = polls.filter(poll => poll.id !== pollId);
      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setPolls(updatedPolls);
    } catch (err) {
      setError('Failed to delete poll');
      throw err;
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return {
    polls,
    loading,
    error,
    createPoll,
    voteOnPoll,
    deletePoll,
    refreshPolls: fetchPolls
  };
};