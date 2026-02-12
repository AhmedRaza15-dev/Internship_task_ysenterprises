// src/components/admin/AnalyticsCharts.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsCharts = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category-wise chart
  const categoryChartData = {
    labels: analyticsData?.categories?.map(c => c.name) || [],
    datasets: [
      {
        label: 'Complaints by Category',
        data: analyticsData?.categories?.map(c => c.count) || [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Monthly trend chart
  const monthlyChartData = {
    labels: analyticsData?.monthlyTrend?.map(m => m.month) || [],
    datasets: [
      {
        label: 'Complaints Trend',
        data: analyticsData?.monthlyTrend?.map(m => m.count) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Overview',
      },
    },
  };

  return (
    <div className="row g-4">
      {/* Category-wise Chart */}
      <div className="col-lg-6">
        <div className="card border-0 shadow h-100">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">Category-wise Complaints</h5>
          </div>
          <div className="card-body">
            <div style={{ height: '300px' }}>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : (
                <Bar data={categoryChartData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="col-lg-6">
        <div className="card border-0 shadow h-100">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">Monthly Complaint Trends</h5>
          </div>
          <div className="card-body">
            <div style={{ height: '300px' }}>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : (
                <Line data={monthlyChartData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Most Frequent Issues */}
      <div className="col-12">
        <div className="card border-0 shadow">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">Most Frequent Issues</h5>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : (
              <div className="row">
                {analyticsData?.frequentIssues?.map((issue, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-3">
                    <div className="card border">
                      <div className="card-body">
                        <h6 className="card-title">{issue.issue}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-primary">{issue.count} occurrences</span>
                          <span className="text-muted">{issue.category}</span>
                        </div>
                        <div className="mt-2">
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: `${(issue.count / analyticsData.maxIssueCount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;