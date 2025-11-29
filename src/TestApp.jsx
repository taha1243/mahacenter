import React from 'react';

function TestApp() {
  return (
    <div style={{
      background: 'orange', 
      padding: '100px', 
      textAlign: 'center',
      minHeight: '100vh',
      fontSize: '48px',
      color: 'white'
    }}>
      <h1>🧪 TEST APP IS WORKING</h1>
      <p>If you see this, the file system is working correctly</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default TestApp;