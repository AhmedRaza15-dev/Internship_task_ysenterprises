import { useState } from 'react';
import Sidebar from '../Components/Admin/Sidebar';
import ComplaintTable from '../Components/Admin/ComplaintTable';

const Complaint = () => {
  const [complaints] = useState([
    {
      id: 101,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      category: 'Technical',
      description: 'Unable to access dashboard features after recent update',
      priority: 'high',
      status: 'pending',
      assignedTo: '',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 102,
      userName: 'Sarah Smith',
      userEmail: 'sarah@example.com',
      category: 'Billing',
      description: 'Incorrect charge on monthly subscription',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Maria Garcia',
      createdAt: '2024-01-14T14:20:00Z'
    },
    // Add more mock complaints as needed
  ]);

  const handleAssign = (complaintId, assignData) => {
    alert(`Complaint #${complaintId} assigned to ${assignData.assignedTo}`);
  };

  const handleStatusUpdate = (complaintId, newStatus) => {
    alert(`Status updated to ${newStatus} for complaint #${complaintId}`);
  };

  const handleRespond = (complaintId, responseData) => {
    alert(`Response sent for complaint #${complaintId}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>
        
        <div className="col-md-9 col-lg-10 p-4 main-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold">Complaint Management</h3>
              <p className="text-muted mb-0">View and manage all user complaints</p>
            </div>
            <div className="btn-group">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-2"></i> Export
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i> New Complaint
              </button>
            </div>
          </div>

          <ComplaintTable
            complaints={complaints}
            onAssign={handleAssign}
            onStatusUpdate={handleStatusUpdate}
            onRespond={handleRespond}
          />
        </div>
      </div>
    </div>
  );
};

export default Complaint;