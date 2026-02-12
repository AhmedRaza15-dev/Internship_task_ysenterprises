import React from 'react';
import Button from '../UI/Button';
import { getPollStatus, formatDate } from '../../utils/dateHelpers';
import { CheckCircle, XCircle, BarChart3, Clock, Users } from 'lucide-react';

const PollCard = ({ poll, onVote, onViewResults, onDelete }) => {
  const status = getPollStatus(poll.expiresAt);
  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
  
  const statusConfig = {
    active: {
      icon: <CheckCircle className="w-4 h-4" />,
      text: 'Active',
      color: 'bg-green-100 text-green-800'
    },
    closed: {
      icon: <XCircle className="w-4 h-4" />,
      text: 'Closed',
      color: 'bg-red-100 text-red-800'
    },
    expired: {
      icon: <Clock className="w-4 h-4" />,
      text: 'Expired',
      color: 'bg-gray-100 text-gray-800'
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
            {statusConfig[status].icon}
            <span className="ml-1">{statusConfig[status].text}</span>
          </span>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{totalVotes} votes</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {poll.question}
        </h3>

        <div className="space-y-2 mb-4">
          {poll.options.slice(0, 3).map((option, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-700 truncate">{option.text}</span>
            </div>
          ))}
          {poll.options.length > 3 && (
            <p className="text-sm text-gray-500">+{poll.options.length - 3} more options</p>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>Expires: {formatDate(poll.expiresAt)}</span>
        </div>

        <div className="flex space-x-3">
          {status === 'active' ? (
            <Button
              variant="primary"
              onClick={onVote}
              className="flex-1"
            >
              Vote Now
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onViewResults}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollCard;