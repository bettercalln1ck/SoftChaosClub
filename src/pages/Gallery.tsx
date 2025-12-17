import React, { useState } from 'react';
import { PaintingCard } from '../components/PaintingCard';
import { usePaintings } from '../context/PaintingsContext';
import './Gallery.css';

type Category = 'all' | 'abstract' | 'landscape' | 'portrait' | 'modern' | 'classical';

export const Gallery: React.FC = () => {
  const { paintings } = usePaintings();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories: Category[] = ['all', 'abstract', 'landscape', 'portrait', 'modern', 'classical'];

  let filteredPaintings = selectedCategory === 'all'
    ? paintings
    : paintings.filter(p => p.category === selectedCategory);

  if (sortBy === 'price-asc') {
    filteredPaintings = [...filteredPaintings].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredPaintings = [...filteredPaintings].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1 className="gallery-title">Art Gallery</h1>
        <p className="gallery-subtitle">Explore our complete collection</p>
      </div>

      <div className="gallery-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="sort-controls">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="sort-select"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="results-count">
            Showing {filteredPaintings.length} artwork{filteredPaintings.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="paintings-grid">
          {filteredPaintings.map(painting => (
            <PaintingCard key={painting.id} painting={painting} />
          ))}
        </div>

        {filteredPaintings.length === 0 && (
          <div className="no-results">
            <p>No paintings found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

