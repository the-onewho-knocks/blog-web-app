import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <div className="auth-icon">
              <Sparkles size={32} />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your creative journey</p>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn-submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <ArrowRight size={20} />
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="auth-link">
              Create one now
            </Link>
          </div>
        </motion.div>

        <div className="auth-visual">
          <div className="visual-orb orb-1"></div>
          <div className="visual-orb orb-2"></div>
          <div className="visual-orb orb-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
