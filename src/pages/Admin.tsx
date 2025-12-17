import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePaintings } from '../context/PaintingsContext';
import type { Painting } from '../types';
import './Admin.css';

export const Admin: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const { paintings, addPainting, deletePainting } = usePaintings();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    price: '',
    image: '',
    description: '',
    dimensions: '',
    medium: '',
    year: new Date().getFullYear().toString(),
    category: 'abstract' as Painting['category'],
  });

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPainting({
        title: formData.title,
        artist: formData.artist,
        price: Number(formData.price),
        image: formData.image,
        description: formData.description,
        dimensions: formData.dimensions,
        medium: formData.medium,
        year: Number(formData.year),
        category: formData.category,
      });
      setFormData({
        title: '',
        artist: '',
        price: '',
        image: '',
        description: '',
        dimensions: '',
        medium: '',
        year: new Date().getFullYear().toString(),
        category: 'abstract',
      });
      setShowAddForm(false);
    } catch (error) {
      alert('Failed to add painting. Please try again.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePainting(id);
      } catch (error) {
        alert('Failed to delete painting. Please try again.');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>🎨 Admin Dashboard</h1>
          <div className="admin-actions">
            <button onClick={() => navigate('/')} className="btn-secondary">
              View Site
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">🖼️</div>
            <div className="stat-info">
              <div className="stat-value">{paintings.length}</div>
              <div className="stat-label">Total Paintings</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <div className="stat-value">
                ₹{paintings.reduce((sum, p) => sum + p.price, 0).toLocaleString('en-IN')}
              </div>
              <div className="stat-label">Total Value</div>
            </div>
          </div>
        </div>

        <div className="admin-toolbar">
          <h2>Manage Paintings</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="btn-add"
          >
            {showAddForm ? '✕ Cancel' : '+ Add New Painting'}
          </button>
        </div>

        {showAddForm && (
          <div className="add-form-card">
            <h3>Add New Painting</h3>
            <form onSubmit={handleSubmit} className="painting-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="artist">Artist *</label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="abstract">Abstract</option>
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="modern">Modern</option>
                    <option value="classical">Classical</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dimensions">Dimensions *</label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder='36" x 48"'
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="medium">Medium *</label>
                  <input
                    type="text"
                    id="medium"
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                    placeholder="Oil on Canvas"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="1800"
                    max="2100"
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Add Painting
              </button>
            </form>
          </div>
        )}

        <div className="paintings-list">
          {paintings.map(painting => (
            <div key={painting._id} className="admin-painting-card">
              <div className="painting-thumbnail">
                <img src={painting.image} alt={painting.title} />
              </div>
              <div className="painting-info">
                <h3>{painting.title}</h3>
                <p className="painting-artist">{painting.artist}</p>
                <div className="painting-details">
                  <span className="painting-price">₹{painting.price.toLocaleString('en-IN')}</span>
                  <span className="painting-category">{painting.category}</span>
                </div>
                <p className="painting-specs">
                  {painting.dimensions} • {painting.medium} • {painting.year}
                </p>
              </div>
              <div className="painting-actions">
                <button
                  onClick={() => handleDelete(painting._id, painting.title)}
                  className="btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

