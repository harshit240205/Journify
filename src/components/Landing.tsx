import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to journal if already logged in
    if (isAuthenticated) {
      navigate('/journal');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-hero">
          <h1 className="landing-title">Journify</h1>
          <p className="landing-tagline">Your Personal Journal Management System</p>
          <p className="landing-description">
            Capture your thoughts, reflect on your day, and track your journey. 
            Journify helps you organize your personal journal entries with ease. 
            Write, edit, and manage your memories all in one beautiful place.
          </p>
          
          <div className="landing-features">
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <h3>Easy Writing</h3>
              <p>Simple and intuitive interface for writing your journal entries</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your entries are protected with secure authentication</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💭</div>
              <h3>Sentiment Analysis</h3>
              <p>Track your emotions and sentiments over time</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Accessible Everywhere</h3>
              <p>Responsive design that works on all devices</p>
            </div>
          </div>

          <div className="landing-actions">
            <button 
              className="btn btn-primary btn-large" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="btn btn-secondary btn-large" 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

