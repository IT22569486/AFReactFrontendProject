import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setMessage('Login successful!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setMessage(errorMessage);
      console.error('Login error:', err.response?.data, err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Login</h2>
            <div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
            </div>
            {message && (
              <div className={`alert mt-3 ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
  );
}

export default Login;