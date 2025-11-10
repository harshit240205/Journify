import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { JournalEntry } from '../types';
import './Journal.css';

const JournalEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      loadEntry(id);
    }
  }, [id, isEditing]);

  const loadEntry = async (entryId: string) => {
    try {
      setLoading(true);
      const entry = await api.getJournalEntryById(entryId);
      setTitle(entry.title || '');
      setContent(entry.content || '');
      setError('');
    } catch (err) {
      setError('Failed to load journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const entry: JournalEntry = {
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
      };

      if (isEditing && id) {
        await api.updateJournalEntry(id, entry);
      } else {
        await api.createJournalEntry(entry);
      }

      navigate('/journal');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save journal entry');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="journal-container">
        <div className="loading">Loading journal entry...</div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      <div className="editor-header">
        <button className="btn btn-secondary" onClick={() => navigate('/journal')}>
          ← Back to Journal
        </button>
        <h1>{isEditing ? 'Edit Entry' : 'New Entry'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="editor-content">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter journal entry title"
            className="editor-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="editor-textarea"
            rows={20}
          />
        </div>

        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/journal')}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || !title.trim()}
          >
            {saving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;

