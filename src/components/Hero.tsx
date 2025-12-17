import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Extraordinary
          <span className="hero-title-accent"> Artworks</span>
        </h1>
        <p className="hero-description">
          Curated collection of stunning paintings from talented artists around the world.
          Each piece tells a unique story, waiting to transform your space.
        </p>
        <div className="hero-buttons">
          <Link to="/gallery" className="btn btn-primary">
            Explore Gallery
          </Link>
          <a href="#featured" className="btn btn-secondary">
            View Featured
          </a>
        </div>
      </div>
      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};


