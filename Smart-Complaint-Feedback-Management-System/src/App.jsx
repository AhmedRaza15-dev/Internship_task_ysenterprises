import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Pages/AdminLoginPage';
import AdminDashboard from './Pages/AdminDashboard';
import ComplaintAnalytics from './Pages/ComplaintAnalytics';
import Complaints from './Pages/Complaint';
import UsersManagement from './Pages/UsersManagement';
import Settings from './Pages/Setting';
import ProtectedRoute from './Components/Common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/complaints" 
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/analytics" 
        element={
          <ProtectedRoute>
            <ComplaintAnalytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute>
            <UsersManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}

export default App;
