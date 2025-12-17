import React from 'react';
import { Link } from 'react-router-dom';
import type { Painting } from '../types';
import { useCart } from '../context/CartContext';
import './PaintingCard.css';

interface PaintingCardProps {
  painting: Painting;
}

export const PaintingCard: React.FC<PaintingCardProps> = ({ painting }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(painting);
  };

  return (
    <Link to={`/painting/${painting._id}`} className="painting-card">
      <div className="card-image-wrapper">
        <img 
          src={painting.image} 
          alt={painting.title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-overlay">
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{painting.title}</h3>
        <p className="card-artist">{painting.artist}</p>
        <div className="card-footer">
          <span className="card-price">₹{painting.price.toLocaleString('en-IN')}</span>
          <span className="card-category">{painting.category}</span>
        </div>
      </div>
    </Link>
  );
};

