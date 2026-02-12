// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import PollCreator from './components/Poll/PollCreator';
import PollCard from './components/Poll/PollCard';
import PollVote from './components/Poll/PollVote';
import EnhancedPollResults from './components/Poll/EnhancedPollResults';
import Modal from './components/UI/Modal';
import Loader, { PageLoader, SkeletonLoader } from './components/UI/Loader';
import { usePolls } from './hooks/usePolls';
import { getPollStatus } from './utils/dateHelpers';

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [viewResults, setViewResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [isCreatingPoll, setIsCreatingPoll] = useState(false);

  const {
    polls,
    loading,
    error,
    createPoll,
    voteOnPoll,
    deletePoll,
    refreshPolls
  } = usePolls();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshPolls();
    }, 60000); // Check for expired polls every minute

    return () => clearInterval(interval);
  }, []);

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      getPollStatus(poll.expiresAt) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVote = async (pollId, selectedOptions) => {
    try {
      setIsSubmittingVote(true);
      await voteOnPoll(pollId, selectedOptions);
      setSelectedPoll(null);
    } catch (error) {
      console.error('Voting failed:', error);
    } finally {
      setIsSubmittingVote(false);
    }
  };

  const handleCreatePoll = async (pollData) => {
    try {
      setIsCreatingPoll(true);
      await createPoll(pollData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Poll creation failed:', error);
    } finally {
      setIsCreatingPoll(false);
    }
  };

  const handleRetry = () => {
    refreshPolls();
  };

  if (loading && polls.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCreatePoll={() => setShowCreateModal(true)}
        onSearch={setSearchTerm}
        onFilterChange={setStatusFilter}
        isLoading={loading}
      />

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={handleRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {loading ? (
              <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
            ) : (
              'Active Polls'
            )}
          </h1>
          <p className="text-gray-600">
            {loading ? (
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
            ) : (
              'Create, vote, and see results in real-time'
            )}
          </p>
        </div>

        {loading && polls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader type="card" count={3} />
          </div>
        ) : filteredPolls.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No polls found
            </h3>
            <p className="text-gray-500">
              {polls.length === 0 
                ? 'Create your first poll to get started!' 
                : 'Try adjusting your search or filters'}
            </p>
            {polls.length === 0 && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Poll
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolls.map(poll => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={() => setSelectedPoll(poll)}
                onViewResults={() => {
                  setSelectedPoll(poll);
                  setViewResults(true);
                }}
                onDelete={deletePoll}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Poll Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Poll"
        size="lg"
      >
        <PollCreator 
          onSubmit={handleCreatePoll}
          isLoading={isCreatingPoll}
        />
      </Modal>

      {/* Vote Modal */}
      <Modal
        isOpen={!!selectedPoll && !viewResults}
        onClose={() => setSelectedPoll(null)}
        title="Cast Your Vote"
        size="md"
      >
        {selectedPoll && (
          <PollVote
            poll={selectedPoll}
            onVote={handleVote}
            onCancel={() => setSelectedPoll(null)}
            isSubmitting={isSubmittingVote}
          />
        )}
      </Modal>

      {/* Results Modal */}
      <Modal
        isOpen={viewResults && !!selectedPoll}
        onClose={() => {
          setViewResults(false);
          setSelectedPoll(null);
        }}
        title="Poll Results"
        size="xl"
      >
        {selectedPoll && (
          <EnhancedPollResults 
            poll={selectedPoll}
            onClose={() => {
              setViewResults(false);
              setSelectedPoll(null);
            }}
          />
        )}
      </Modal>

      {/* Global Loading Overlay for Voting */}
      {isSubmittingVote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <Loader size="lg" text="Submitting your vote..." />
          </div>
        </div>
      )}

      {/* Global Loading Overlay for Poll Creation */}
      {isCreatingPoll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <Loader size="lg" text="Creating poll..." />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;