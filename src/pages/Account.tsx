import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import './Account.css';

export const Account: React.FC = () => {
  const { user, isLoggedIn, logout, updateProfile } = useUserAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    updateProfile(name);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and preferences</p>
        </div>

        <div className="account-content">
          <div className="account-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit
                </button>
              )}
            </div>

            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="profile-details">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="edit-actions">
                      <button onClick={handleSave} className="save-btn">
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setName(user?.name || '');
                          setIsEditing(false);
                        }}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="info-row">
                      <span className="info-label">Name:</span>
                      <span className="info-value">{user?.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{user?.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Member Since:</span>
                      <span className="info-value">
                        {new Date(user?.createdAt || '').toLocaleDateString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="account-card">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="action-buttons">
              <button onClick={() => navigate('/gallery')} className="action-btn">
                <span className="action-icon">🎨</span>
                <div>
                  <div className="action-title">Browse Gallery</div>
                  <div className="action-desc">Explore our collection</div>
                </div>
              </button>
              <button onClick={() => navigate('/cart')} className="action-btn">
                <span className="action-icon">🛒</span>
                <div>
                  <div className="action-title">View Cart</div>
                  <div className="action-desc">Check your items</div>
                </div>
              </button>
            </div>
          </div>

          <div className="account-card danger-zone">
            <div className="card-header">
              <h2>Account Actions</h2>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


