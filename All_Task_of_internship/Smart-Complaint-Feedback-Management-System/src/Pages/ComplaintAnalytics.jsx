import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AnalyticsCharts from '../components/admin/AnalyticsCharts';

const ComplaintAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold">Analytics Dashboard</h3>
              <p className="text-muted mb-0">Complaint statistics and insights</p>
            </div>
            
            {/* Time Range Filters */}
            <div className="d-flex gap-2">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-primary ${timeRange === 'daily' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('daily')}
                >
                  Daily
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-primary ${timeRange === 'weekly' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('weekly')}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-primary ${timeRange === 'monthly' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-primary ${timeRange === 'yearly' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('yearly')}
                >
                  Yearly
                </button>
              </div>
              
              <button className="btn btn-primary">
                <i className="bi bi-download me-2"></i> Export Data
              </button>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Avg. Resolution Time</h6>
                      <h3 className="fw-bold text-primary">2.5 Days</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <i className="bi bi-clock text-primary fs-4"></i>
                    </div>
                  </div>
                  <small className="text-success">
                    <i className="bi bi-arrow-down me-1"></i> 12% improvement
                  </small>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Satisfaction Rate</h6>
                      <h3 className="fw-bold text-success">92%</h3>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                      <i className="bi bi-emoji-smile text-success fs-4"></i>
                    </div>
                  </div>
                  <small className="text-success">
                    <i className="bi bi-arrow-up me-1"></i> 5% increase
                  </small>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Response Time</h6>
                      <h3 className="fw-bold text-info">4.2 hrs</h3>
                    </div>
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                      <i className="bi bi-lightning-charge text-info fs-4"></i>
                    </div>
                  </div>
                  <small className="text-success">
                    <i className="bi bi-arrow-down me-1"></i> 18% faster
                  </small>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Reopened Cases</h6>
                      <h3 className="fw-bold text-warning">3.8%</h3>
                    </div>
                    <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                      <i className="bi bi-arrow-repeat text-warning fs-4"></i>
                    </div>
                  </div>
                  <small className="text-danger">
                    <i className="bi bi-arrow-up me-1"></i> 0.5% increase
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading analytics data...</p>
            </div>
          ) : (
            <AnalyticsCharts />
          )}
          
          {/* Additional Insights */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">Top Performing Staff</h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {['Alex Johnson', 'Maria Garcia', 'David Smith', 'Sarah Miller', 'James Wilson'].map((staff, index) => (
                      <div key={index} className="list-group-item border-0 px-0 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                              <i className="bi bi-person-fill text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">{staff}</h6>
                              <small className="text-muted">Tech Support</small>
                            </div>
                          </div>
                          <div className="text-end">
                            <h5 className="mb-0 text-success">{95 - index * 2}%</h5>
                            <small className="text-muted">Resolved</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-0 shadow h-100">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">Priority Analysis</h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>High Priority</span>
                      <span className="fw-bold">42%</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div className="progress-bar bg-danger" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Medium Priority</span>
                      <span className="fw-bold">35%</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Low Priority</span>
                      <span className="fw-bold">23%</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div className="progress-bar bg-success" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Insight:</strong> High priority complaints have increased by 15% this month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintAnalytics;