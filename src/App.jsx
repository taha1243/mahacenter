import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DemoLanding } from './ClinicLanding';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('🚀 NEW App component rendered - isLoggedIn:', isLoggedIn);

  const handleLogin = (success) => {
    console.log('🔐 Login callback received, success:', success);
    if (success) {
      setIsLoggedIn(true);
      console.log('✅ User logged in successfully');
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logout callback received');
    setIsLoggedIn(false);
    console.log('✅ User logged out successfully');
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<DemoLanding />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          } 
        />
        
        <Route 
          path="/admin/dashboard" 
          element={
            isLoggedIn ? (
              <AdminPanel onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin" replace />
            )
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;