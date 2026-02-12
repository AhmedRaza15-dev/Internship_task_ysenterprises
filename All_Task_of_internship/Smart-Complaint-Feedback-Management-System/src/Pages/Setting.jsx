import { useState } from 'react';
import Sidebar from '../Components/Admin/Sidebar';

const Setting = () => {
  const [settings, setSettings] = useState({
    siteName: 'Complaint Management System',
    siteEmail: 'support@complaintsystem.com',
    notificationEmail: true,
    notificationSMS: false,
    autoAssignComplaints: true,
    responseDeadline: 48,
    enableUserRegistration: true,
    maintenanceMode: false,
    themeColor: '#4dabf7'
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
    console.log('Saved settings:', settings);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings?')) {
      setSettings({
        siteName: 'Complaint Management System',
        siteEmail: 'support@complaintsystem.com',
        notificationEmail: true,
        notificationSMS: false,
        autoAssignComplaints: true,
        responseDeadline: 48,
        enableUserRegistration: true,
        maintenanceMode: false,
        themeColor: '#4dabf7'
      });
    }
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
              <h3 className="fw-bold">System Settings</h3>
              <p className="text-muted mb-0">Configure system preferences and options</p>
            </div>
            <div className="btn-group">
              <button className="btn btn-outline-secondary" onClick={handleReset}>
                <i className="bi bi-arrow-clockwise me-2"></i> Reset
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="bi bi-save me-2"></i> Save Changes
              </button>
            </div>
          </div>

          <div className="row">
            {/* General Settings */}
            <div className="col-lg-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-gear me-2"></i>
                    General Settings
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Site Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={settings.siteName}
                      onChange={(e) => handleChange('siteName', e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={settings.siteEmail}
                      onChange={(e) => handleChange('siteEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Response Deadline (hours)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="168"
                      value={settings.responseDeadline}
                      onChange={(e) => handleChange('responseDeadline', parseInt(e.target.value))}
                    />
                    <small className="text-muted">Time allowed to respond to complaints</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Theme Color</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="color"
                        className="form-control-color me-3"
                        value={settings.themeColor}
                        onChange={(e) => handleChange('themeColor', e.target.value)}
                      />
                      <span>{settings.themeColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="col-lg-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-bell me-2"></i>
                    Notification Settings
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.notificationEmail}
                      onChange={(e) => handleChange('notificationEmail', e.target.checked)}
                    />
                    <label className="form-check-label">
                      Email Notifications
                    </label>
                    <small className="text-muted d-block">Send email notifications for new complaints</small>
                  </div>
                  
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.notificationSMS}
                      onChange={(e) => handleChange('notificationSMS', e.target.checked)}
                    />
                    <label className="form-check-label">
                      SMS Notifications
                    </label>
                    <small className="text-muted d-block">Send SMS alerts for urgent complaints</small>
                  </div>
                  
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.autoAssignComplaints}
                      onChange={(e) => handleChange('autoAssignComplaints', e.target.checked)}
                    />
                    <label className="form-check-label">
                      Auto-Assign Complaints
                    </label>
                    <small className="text-muted d-block">Automatically assign new complaints to available staff</small>
                  </div>
                </div>
              </div>
            </div>

            {/* User Management Settings */}
            <div className="col-lg-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-people me-2"></i>
                    User Management
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.enableUserRegistration}
                      onChange={(e) => handleChange('enableUserRegistration', e.target.checked)}
                    />
                    <label className="form-check-label">
                      Enable User Registration
                    </label>
                    <small className="text-muted d-block">Allow new users to register on the system</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Default User Role</label>
                    <select className="form-select">
                      <option>User</option>
                      <option>Staff</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="col-lg-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-wrench me-2"></i>
                    System Configuration
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                    />
                    <label className="form-check-label">
                      Maintenance Mode
                    </label>
                    <small className="text-muted d-block">Put system under maintenance (users cannot access)</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Backup Frequency</label>
                    <select className="form-select">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  
                  <button className="btn btn-outline-danger w-100 mt-2">
                    <i className="bi bi-database-down me-2"></i>
                    Create Backup Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;