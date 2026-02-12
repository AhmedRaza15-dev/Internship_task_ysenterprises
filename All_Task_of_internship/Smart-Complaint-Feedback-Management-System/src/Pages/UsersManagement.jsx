import { useState } from 'react';
import Sidebar from '../Components/Admin/Sidebar';

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', complaints: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', complaints: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', complaints: 12 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Staff', status: 'Active', complaints: 8 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', complaints: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
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
              <h3 className="fw-bold">User Management</h3>
              <p className="text-muted mb-0">Manage system users and their permissions</p>
            </div>
            <button className="btn btn-primary">
              <i className="bi bi-person-plus me-2"></i> Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="User">User</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-secondary w-100">
                <i className="bi bi-filter me-2"></i> More Filters
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="card border-0 shadow">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4">ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Complaints</th>
                      <th className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="ps-4">#{user.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                              <i className="bi bi-person text-primary"></i>
                            </div>
                            <span className="fw-medium">{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : user.role === 'Staff' ? 'bg-warning' : 'bg-secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold">{user.complaints}</span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" title="Edit">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              className={`btn ${user.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                              onClick={() => toggleUserStatus(user.id)}
                              title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                            >
                              <i className={`bi ${user.status === 'Active' ? 'bi-person-x' : 'bi-person-check'}`}></i>
                            </button>
                            <button className="btn btn-outline-info" title="View Details">
                              <i className="bi bi-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total Users</h6>
                  <h3 className="fw-bold text-primary">{users.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Active Users</h6>
                  <h3 className="fw-bold text-success">
                    {users.filter(u => u.status === 'Active').length}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Staff Members</h6>
                  <h3 className="fw-bold text-warning">
                    {users.filter(u => u.role === 'Staff').length}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Admins</h6>
                  <h3 className="fw-bold text-danger">
                    {users.filter(u => u.role === 'Admin').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
