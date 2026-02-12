import { useState } from 'react';

const ComplaintTable = ({ complaints, onAssign, onStatusUpdate, onRespond }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [assignData, setAssignData] = useState({ assignedTo: '', department: '' });
  const [responseData, setResponseData] = useState({ message: '', sendEmail: true });
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort complaints
  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesSearch = complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    }
    return 0;
  });

  const handleAssignSubmit = () => {
    if (selectedComplaint) {
      onAssign(selectedComplaint.id, assignData);
      setShowAssignModal(false);
      setAssignData({ assignedTo: '', department: '' });
    }
  };

  const handleResponseSubmit = () => {
    if (selectedComplaint) {
      onRespond(selectedComplaint.id, responseData);
      setShowResponseModal(false);
      setResponseData({ message: '', sendEmail: true });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', color: 'warning', icon: 'bi-clock' },
      'in-progress': { label: 'In Progress', color: 'info', icon: 'bi-gear' },
      resolved: { label: 'Resolved', color: 'success', icon: 'bi-check-circle' },
      rejected: { label: 'Rejected', color: 'danger', icon: 'bi-x-circle' }
    };
    
    const config = statusConfig[status] || { label: status, color: 'secondary', icon: 'bi-question' };
    
    return (
      <span className={`badge bg-${config.color} bg-opacity-10 text-${config.color} border border-${config.color} border-opacity-25`}>
        <i className={`bi ${config.icon} me-1`}></i>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'High', color: 'danger', icon: 'bi-exclamation-triangle' },
      medium: { label: 'Medium', color: 'warning', icon: 'bi-exclamation-circle' },
      low: { label: 'Low', color: 'success', icon: 'bi-check-circle' }
    };
    
    const config = priorityConfig[priority] || { label: priority, color: 'secondary', icon: 'bi-circle' };
    
    return (
      <span className={`badge bg-${config.color} bg-opacity-10 text-${config.color}`}>
        <i className={`bi ${config.icon} me-1`}></i>
        {config.label}
      </span>
    );
  };

  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-white border-0 py-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-0">Complaint Management</h5>
            <p className="text-muted mb-0">Total: {complaints.length} complaints</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
              {/* Search */}
              <div className="input-group input-group-sm" style={{ width: '200px' }}>
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter */}
              <select
                className="form-select form-select-sm"
                style={{ width: 'auto' }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Sort */}
              <select
                className="form-select form-select-sm"
                style={{ width: 'auto' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
              
              <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-filter"></i> More Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Date</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedComplaints.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-5">
                    <div className="py-4">
                      <i className="bi bi-inbox display-6 text-muted"></i>
                      <p className="mt-3">No complaints found</p>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => {
                        setFilterStatus('all');
                        setSearchTerm('');
                      }}>
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedComplaints.map((complaint) => (
                  <tr key={complaint.id} className="align-middle">
                    <td className="ps-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <span className="fw-bold">#{complaint.id}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                          <i className="bi bi-person text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-medium">{complaint.userName}</div>
                          <small className="text-muted">{complaint.userEmail}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {complaint.category}
                      </span>
                    </td>
                    <td style={{ maxWidth: '250px' }}>
                      <div className="text-truncate" title={complaint.description}>
                        {complaint.description}
                      </div>
                      <small className="text-muted d-block mt-1">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      {getPriorityBadge(complaint.priority)}
                    </td>
                    <td>
                      {getStatusBadge(complaint.status)}
                    </td>
                    <td>
                      {complaint.assignedTo ? (
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-info bg-opacity-10 p-1 me-2">
                            <i className="bi bi-person-badge text-info"></i>
                          </div>
                          <span>{complaint.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-muted">Not assigned</span>
                      )}
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          className="btn btn-outline-primary"
                          title="View Details"
                          onClick={() => {/* Open detail view */}}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-success"
                          title="Assign"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowAssignModal(true);
                          }}
                        >
                          <i className="bi bi-person-plus"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          title="Update Status"
                          onClick={() => {
                            const newStatus = complaint.status === 'pending' ? 'in-progress' : 
                                           complaint.status === 'in-progress' ? 'resolved' : 'pending';
                            onStatusUpdate(complaint.id, newStatus);
                          }}
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                        <button
                          className="btn btn-outline-warning"
                          title="Respond"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowResponseModal(true);
                          }}
                        >
                          <i className="bi bi-reply"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {sortedComplaints.length > 0 && (
        <div className="card-footer bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">
                Showing {Math.min(sortedComplaints.length, 10)} of {sortedComplaints.length} complaints
              </small>
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <button className="page-link">Previous</button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link">3</button>
                </li>
                <li className="page-item">
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Assign Modal */}
      {showAssignModal && selectedComplaint && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Assign Complaint #{selectedComplaint.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAssignModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Assign To</label>
                  <select
                    className="form-select"
                    value={assignData.assignedTo}
                    onChange={(e) => setAssignData({...assignData, assignedTo: e.target.value})}
                  >
                    <option value="">Select Staff Member</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Maria Garcia">Maria Garcia</option>
                    <option value="David Smith">David Smith</option>
                    <option value="Sarah Miller">Sarah Miller</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-select"
                    value={assignData.department}
                    onChange={(e) => setAssignData({...assignData, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Billing">Billing</option>
                    <option value="Network">Network</option>
                  </select>
                </div>
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  This complaint will be assigned and notification will be sent to the staff member.
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAssignSubmit}
                  disabled={!assignData.assignedTo}
                >
                  Assign Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Response Modal */}
      {showResponseModal && selectedComplaint && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Respond to Complaint #{selectedComplaint.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResponseModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Response Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Type your response here..."
                    value={responseData.message}
                    onChange={(e) => setResponseData({...responseData, message: e.target.value})}
                  ></textarea>
                  <small className="text-muted">
                    This response will be sent to {selectedComplaint.userName} ({selectedComplaint.userEmail})
                  </small>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={responseData.sendEmail}
                    onChange={(e) => setResponseData({...responseData, sendEmail: e.target.checked})}
                  />
                  <label className="form-check-label">
                    Send email notification to user
                  </label>
                </div>
                <div className="alert alert-success">
                  <i className="bi bi-lightbulb me-2"></i>
                  <strong>Tip:</strong> Be clear and concise. Include next steps if needed.
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowResponseModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleResponseSubmit}
                  disabled={!responseData.message.trim()}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintTable;