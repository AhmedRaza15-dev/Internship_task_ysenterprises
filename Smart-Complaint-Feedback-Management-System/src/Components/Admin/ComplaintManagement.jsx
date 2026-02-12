import { useState, useEffect } from 'react';
import ComplaintTable from './ComplaintTable';

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData = [
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
        {
          id: 103,
          userName: 'Robert Johnson',
          userEmail: 'robert@example.com',
          category: 'Network',
          description: 'Slow internet connection during peak hours',
          priority: 'high',
          status: 'pending',
          assignedTo: '',
          createdAt: '2024-01-14T09:15:00Z'
        },
        {
          id: 104,
          userName: 'Emily Chen',
          userEmail: 'emily@example.com',
          category: 'Service',
          description: 'Need assistance with account setup',
          priority: 'low',
          status: 'resolved',
          assignedTo: 'David Smith',
          createdAt: '2024-01-13T16:45:00Z'
        },
        {
          id: 105,
          userName: 'Michael Brown',
          userEmail: 'michael@example.com',
          category: 'Technical',
          description: 'Mobile app crashing on iOS 17',
          priority: 'high',
          status: 'in-progress',
          assignedTo: 'Alex Johnson',
          createdAt: '2024-01-12T11:10:00Z'
        }
      ];
      
      setComplaints(mockData);
      // Actual API call:
      // const response = await fetch('/api/complaints');
      // const data = await response.json();
      // setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (complaintId, assignData) => {
    try {
      console.log(`Assigning complaint ${complaintId} to ${assignData.assignedTo}`);
      // API call would go here
      // await fetch(`/api/complaints/${complaintId}/assign`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(assignData)
      // });
      
      // Update local state
      setComplaints(prev => prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, assignedTo: assignData.assignedTo, status: 'in-progress' }
          : complaint
      ));
      
      alert(`Complaint #${complaintId} assigned to ${assignData.assignedTo}`);
    } catch (error) {
      console.error('Error assigning complaint:', error);
      alert('Failed to assign complaint');
    }
  };

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      // API call would go here
      console.log(`Updating status of complaint ${complaintId} to ${newStatus}`);
      
      // Update local state
      setComplaints(prev => prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, status: newStatus }
          : complaint
      ));
      
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleRespond = async (complaintId, responseData) => {
    try {
      // API call would go here
      console.log(`Responding to complaint ${complaintId}:`, responseData);
      
      // Update local state - mark as resolved if response sent
      setComplaints(prev => prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, status: 'resolved', responded: true }
          : complaint
      ));
      
      alert('Response sent successfully');
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Failed to send response');
    }
  };

  return (
    <div className="container-fluid p-0">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading complaints...</p>
        </div>
      ) : (
        <ComplaintTable
          complaints={complaints}
          onAssign={handleAssign}
          onStatusUpdate={handleStatusUpdate}
          onRespond={handleRespond}
        />
      )}
    </div>
  );
};

export default ComplaintManagement;