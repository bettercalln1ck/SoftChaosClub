import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import { usePaintings } from '../context/PaintingsContext';
import type { Painting } from '../types';
import './Admin.css';

export const Admin: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const { user: dbUser } = useUserAuth();
  const { paintings, addPainting, deletePainting, updatePainting } = usePaintings();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
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

  // Check if user is logged in with database credentials AND is admin
  const isDbAdmin = dbUser?.isAdmin === true;
  
  if (!isAdmin && !isDbAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If only simple admin (no token), show warning
  if (isAdmin && !isDbAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="admin-container">
          <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>⚠️ Authentication Required</h2>
            <p>To manage paintings, you need to login with database credentials.</p>
            <p><strong>Please login with:</strong></p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Email: admin@artgallery.com</li>
              <li>Password: admin123</li>
            </ul>
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }} 
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '16px' }}
              >
                Go to Login Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.image;

    setUploading(true);
    try {
      // Get token from apiUser object
      const apiUser = localStorage.getItem('apiUser');
      if (!apiUser) {
        throw new Error('Not authenticated. Please login again.');
      }
      const token = JSON.parse(apiUser).token;
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);

      const response = await fetch(`http://localhost:5000/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Upload failed');
      }

      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
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
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
  };

  const handleEdit = (painting: Painting) => {
    setEditingId(painting._id);
    setFormData({
      title: painting.title,
      artist: painting.artist,
      price: painting.price.toString(),
      image: painting.image,
      description: painting.description,
      dimensions: painting.dimensions,
      medium: painting.medium,
      year: painting.year.toString(),
      category: painting.category,
    });
    setImagePreview(painting.image);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const paintingData = {
        title: formData.title,
        artist: formData.artist,
        price: Number(formData.price),
        image: imageUrl,
        description: formData.description,
        dimensions: formData.dimensions,
        medium: formData.medium,
        year: Number(formData.year),
        category: formData.category,
      };

      if (editingId) {
        await updatePainting(editingId, paintingData);
        alert('Painting updated successfully!');
      } else {
        await addPainting(paintingData);
        alert('Painting added successfully!');
      }
      
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error('Submit error:', error);
      alert(editingId ? 'Failed to update painting.' : 'Failed to add painting.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
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
            onClick={() => {
              if (showAddForm) {
                resetForm();
                setShowAddForm(false);
              } else {
                resetForm();
                setShowAddForm(true);
              }
            }} 
            className="btn-add"
          >
            {showAddForm ? '✕ Cancel' : '+ Add New Painting'}
          </button>
        </div>

        {showAddForm && (
          <div className="add-form-card">
            <h3>{editingId ? 'Edit Painting' : 'Add New Painting'}</h3>
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
                <label htmlFor="image">Image *</label>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: '10px' }}
                  />
                  <small style={{ display: 'block', color: '#666', marginBottom: '10px' }}>
                    Upload an image (max 10MB) or enter URL below
                  </small>
                </div>
                {imagePreview && (
                  <div style={{ marginBottom: '10px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Or paste image URL here..."
                  required={!imageFile}
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

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : (editingId ? 'Update Painting' : 'Add Painting')}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancel} className="btn-secondary">
                    Cancel Edit
                  </button>
                )}
              </div>
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
                  onClick={() => handleEdit(painting)}
                  className="btn-edit"
                >
                  ✏️ Edit
                </button>
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

