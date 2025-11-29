import React from 'react';
import AdminLogin from './components/AdminLogin';

// Test component to isolate the login form
function TestLoginOnly() {
  console.log('🧪 TestLoginOnly component rendered');
  
  const handleLogin = (success) => {
    console.log('🧪 Test login callback:', success);
    alert('Login successful! Check console.');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>🧪 TEST MODE - Login Form Only</h1>
      <p>This should show ONLY the login form, no admin panel.</p>
      <AdminLogin onLogin={handleLogin} />
    </div>
  );
}

export default TestLoginOnly;