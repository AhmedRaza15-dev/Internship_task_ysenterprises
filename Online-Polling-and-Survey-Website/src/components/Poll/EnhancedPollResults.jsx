import React, { useMemo } from 'react';
import { 
  PieChart as PieChartIcon, 
  BarChart3 as BarChartIcon,
  TrendingUp,
  Users,
  Clock,
  Share2,
  Download
} from 'lucide-react';
import Button from '../UI/Button';
import { formatDate } from '../../utils/dateHelpers';


import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const EnhancedPollResults = ({ poll, onClose }) => {
  const totalVotes = useMemo(() => 
    poll.options.reduce((sum, option) => sum + (option.votes || 0), 0),
    [poll]
  );

  // Prepare data for charts
  const pieChartData = {
    labels: poll.options.map(opt => opt.text),
    datasets: [
      {
        data: poll.options.map(opt => opt.votes || 0),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // emerald
          '#8B5CF6', // violet
          '#F59E0B', // amber
          '#EF4444', // red
          '#EC4899', // pink
          '#06B6D4', // cyan
          '#84CC16', // lime
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
      }
    ]
  };

  const barChartData = {
    labels: poll.options.map(opt => opt.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map(opt => opt.votes || 0),
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 1,
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{poll.question}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {totalVotes} total votes
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Expires: {formatDate(poll.expiresAt)}
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <PieChartIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-gray-900">Vote Distribution</h4>
          </div>
          <div className="h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <BarChartIcon className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-semibold text-gray-900">Votes Comparison</h4>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" className="flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPollResults;