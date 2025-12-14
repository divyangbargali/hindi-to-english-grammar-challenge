import React, { useState } from 'react';
import { storage } from '../utils/storage';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const user = storage.findUser(username);
    if (!user || user.password !== password) {
      setError('Invalid username or password');
      return;
    }

    onLogin(username);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? 
          <button onClick={onSwitchToRegister} className="link-btn">Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;