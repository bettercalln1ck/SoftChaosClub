import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PaintingCard } from '../components/PaintingCard';
import { usePaintings } from '../context/PaintingsContext';
import './Home.css';

export const Home: React.FC = () => {
  const { paintings } = usePaintings();
  const featuredPaintings = paintings.slice(0, 6);

  return (
    <div className="home">
      <Hero />
      
      <section id="featured" className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Artworks</h2>
          <p className="section-description">
            Handpicked masterpieces from our collection
          </p>
          
          <div className="paintings-grid">
            {featuredPaintings.map(painting => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </div>

          <div className="view-all-wrapper">
            <Link to="/gallery" className="view-all-btn">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Bringing Art to Your Space</h2>
              <p>
                We curate exceptional artworks from talented artists worldwide. 
                Each painting in our collection is carefully selected for its 
                artistic merit, uniqueness, and ability to transform spaces.
              </p>
              <p>
                Whether you're a seasoned collector or discovering art for the 
                first time, we're here to help you find the perfect piece that 
                resonates with your style and vision.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">✨</span>
                  <div>
                    <h3>Curated Selection</h3>
                    <p>Every piece handpicked by art experts</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎨</span>
                  <div>
                    <h3>Authentic Artworks</h3>
                    <p>Direct from talented artists</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <h3>Secure Delivery</h3>
                    <p>Safe shipping worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

