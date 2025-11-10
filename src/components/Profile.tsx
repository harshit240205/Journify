import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadGreeting();
  }, []);

  const loadGreeting = async () => {
    try {
      setLoading(true);
      const data = await api.getUserGreeting();
      setGreeting(data);
      setError('');
    } catch (err) {
      setError('Failed to load user information');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteUser();
      logout();
      navigate('/login');
    } catch (err) {
      alert('Failed to delete account');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="btn btn-secondary" onClick={() => navigate('/journal')}>
          ← Back to Journal
        </button>
        <h1>Profile</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-card">
        <div className="profile-section">
          <h2>Welcome!</h2>
          <p className="greeting">{greeting}</p>
        </div>

        <div className="profile-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/journal')}>
            Go to Journal
          </button>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
          <button className="btn btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

