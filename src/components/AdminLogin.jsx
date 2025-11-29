import React, { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication (in production, use proper backend auth)
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      setTimeout(() => {
        setLoading(false);
        onLogin(true);
      }, 1000); // Simulate API call
    } else {
      setTimeout(() => {
        setLoading(false);
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>🦷 Centre Dentaire Dr Maha</h1>
          <h2>Administration</h2>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="admin"
              required
              className="admin-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="admin"
              required
              className="admin-input"
            />
          </div>

          {error && (
            <div className="admin-error">
              ❌ {error}
            </div>
          )}

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? '🔄 Connexion...' : '🔐 Se connecter'}
          </button>

          <div className="admin-info">
            <p><strong>Compte de démonstration:</strong></p>
            <p>Utilisateur: <code>admin</code></p>
            <p>Mot de passe: <code>admin</code></p>
          </div>
        </form>
      </div>
    </div>
  );
}