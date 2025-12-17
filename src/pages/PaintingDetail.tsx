import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePaintings } from '../context/PaintingsContext';
import { useCart } from '../context/CartContext';
import './PaintingDetail.css';

export const PaintingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { paintings } = usePaintings();
  const { addToCart } = useCart();
  const painting = paintings.find(p => p._id === id);

  if (!painting) {
    return (
      <div className="painting-detail">
        <div className="container">
          <div className="not-found">
            <h1>Painting not found</h1>
            <Link to="/gallery" className="back-link">← Back to Gallery</Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedPaintings = paintings
    .filter(p => p.category === painting.category && p._id !== painting._id)
    .slice(0, 3);

  return (
    <div className="painting-detail">
      <div className="container">
        <Link to="/gallery" className="back-link">← Back to Gallery</Link>

        <div className="detail-content">
          <div className="detail-image">
            <img src={painting.image} alt={painting.title} />
          </div>

          <div className="detail-info">
            <span className="detail-category">{painting.category}</span>
            <h1 className="detail-title">{painting.title}</h1>
            <p className="detail-artist">by {painting.artist}</p>

            <div className="detail-price-section">
              <span className="detail-price">₹{painting.price.toLocaleString('en-IN')}</span>
            </div>

            <p className="detail-description">{painting.description}</p>

            <div className="detail-specs">
              <div className="spec">
                <span className="spec-label">Medium:</span>
                <span className="spec-value">{painting.medium}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">{painting.dimensions}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Year:</span>
                <span className="spec-value">{painting.year}</span>
              </div>
            </div>

            <button 
              className="add-to-cart-detail-btn"
              onClick={() => addToCart(painting)}
            >
              Add to Cart
            </button>

            <div className="detail-features">
              <div className="feature-item">
                <span>✓</span> Authenticity Certificate
              </div>
              <div className="feature-item">
                <span>✓</span> Secure Packaging
              </div>
              <div className="feature-item">
                <span>✓</span> Free Shipping
              </div>
            </div>
          </div>
        </div>

        {relatedPaintings.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">You May Also Like</h2>
            <div className="related-grid">
              {relatedPaintings.map(p => (
                <Link 
                  key={p._id} 
                  to={`/painting/${p._id}`} 
                  className="related-card"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img src={p.image} alt={p.title} />
                  <div className="related-info">
                    <h3>{p.title}</h3>
                    <p>₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

