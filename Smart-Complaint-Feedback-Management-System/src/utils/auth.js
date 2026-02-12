// src/utils/auth.js
export const mockLogin = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For development: always succeed
      const user = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=4dabf7&color=fff`
      };
      
      localStorage.setItem('adminToken', `mock-token-${Date.now()}`);
      localStorage.setItem('adminUser', JSON.stringify(user));
      
      resolve({ success: true, user });
    }, 500);
  });
};

export const isAuthenticated = () => {
  // Development bypass
  if (import.meta.env.DEV) {
    return true; // Always authenticated in development
  }
  
  // Production check
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');
  return !!(token && user);
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  window.location.href = '/admin/login';
};