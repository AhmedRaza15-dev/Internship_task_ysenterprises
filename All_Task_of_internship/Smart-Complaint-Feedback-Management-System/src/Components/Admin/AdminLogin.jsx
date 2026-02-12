import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // MOCK LOGIN - Accepts any email/password for development
      setTimeout(() => {
        // For development only - accept any login
        if (credentials.email && credentials.password) {
          // Mock user data
          const mockUser = {
            id: 1,
            name: 'Admin User',
            email: credentials.email,
            role: 'admin'
          };
          
          localStorage.setItem('adminToken', 'mock-jwt-token-' + Date.now());
          localStorage.setItem('adminUser', JSON.stringify(mockUser));
          
          console.log('Login successful:', mockUser);
          navigate('/admin/dashboard');
        } else {
          setError('Please enter both email and password');
        }
        setLoading(false);
      }, 500); // Small delay for realism
      
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-md-4 col-lg-3">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white border-0">
            <div className="text-center py-3">
              <h4 className="mb-0">
                <i className="bi bi-shield-check me-2"></i>
                Admin Panel
              </h4>
              <small className="opacity-75">Development Mode</small>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Admin Login</h3>
              <p className="text-muted">Smart Complaint Management System</p>
            </div>
            
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                  placeholder="Enter any email"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  <i className="bi bi-key me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                  placeholder="Enter any password"
                />
              </div>
              
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>
              </div>
              
              <div className="text-center mt-3">
                <div className="alert alert-info mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Development Mode:</strong> Any email/password works
                </div>
                <small className="text-muted">
                  Enter any credentials to proceed
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;