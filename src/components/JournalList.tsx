import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { JournalEntry } from '../types';
import { useAuth } from '../context/AuthContext';
import './Journal.css';

const JournalList: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await api.getJournalEntries();
      setEntries(data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setEntries([]);
      } else {
        setError('Failed to load journal entries');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await api.deleteJournalEntry(id);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err) {
      alert('Failed to delete entry');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'HAPPY':
        return '#4caf50';
      case 'SAD':
        return '#2196f3';
      case 'ANGRY':
        return '#f44336';
      case 'ANXIOUS':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  if (loading) {
    return (
      <div className="journal-container">
        <div className="loading">Loading your journal entries...</div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h1>My Journal</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/journal/new')}>
            + New Entry
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/profile')}>
            Profile
          </button>
          <button className="btn btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {entries.length === 0 ? (
        <div className="empty-state">
          <h2>No journal entries yet</h2>
          <p>Start writing your first entry to begin your journaling journey!</p>
          <button className="btn btn-primary" onClick={() => navigate('/journal/new')}>
            Create First Entry
          </button>
        </div>
      ) : (
        <div className="journal-grid">
          {entries.map((entry) => (
            <div key={entry.id} className="journal-card">
              <div className="journal-card-header">
                <h3>{entry.title || 'Untitled'}</h3>
                {entry.sentiment && (
                  <span
                    className="sentiment-badge"
                    style={{ backgroundColor: getSentimentColor(entry.sentiment) }}
                  >
                    {entry.sentiment}
                  </span>
                )}
              </div>
              <p className="journal-date">{formatDate(entry.date)}</p>
              <p className="journal-content">
                {entry.content?.substring(0, 150)}
                {entry.content && entry.content.length > 150 ? '...' : ''}
              </p>
              <div className="journal-card-actions">
                <button
                  className="btn btn-small btn-primary"
                  onClick={() => navigate(`/journal/${entry.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => handleDelete(entry.id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalList;

