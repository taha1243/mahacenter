import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DemoLanding } from './ClinicLanding';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = (success) => {
    setIsAdminAuthenticated(success);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Main website route */}
        <Route path="/" element={<DemoLanding />} />
        
        {/* Admin login route */}
        <Route 
          path="/admin" 
          element={
            isAdminAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin onLogin={handleAdminLogin} />
          } 
        />
        
        {/* Admin dashboard route (protected) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
              <AdminPanel onLogout={handleAdminLogout} />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect any other /admin/* routes to login if not authenticated */}
        <Route 
          path="/admin/*" 
          element={
            isAdminAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/admin" replace />
          } 
        />
        
        {/* Catch all other routes and redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;