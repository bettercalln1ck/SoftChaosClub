import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Painting } from '../types';
import { paintingsAPI } from '../services/api';

interface PaintingsContextType {
  paintings: Painting[];
  addPainting: (painting: Omit<Painting, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deletePainting: (id: string) => Promise<void>;
  updatePainting: (id: string, painting: Omit<Painting, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshPaintings: () => Promise<void>;
}

const PaintingsContext = createContext<PaintingsContextType | undefined>(undefined);

export const PaintingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaintings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await paintingsAPI.getAll();
      setPaintings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch paintings');
      console.error('Error fetching paintings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  const addPainting = async (painting: Omit<Painting, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPainting = await paintingsAPI.create(painting);
      setPaintings(prev => [...prev, newPainting]);
    } catch (err) {
      console.error('Error adding painting:', err);
      throw err;
    }
  };

  const deletePainting = async (id: string) => {
    try {
      await paintingsAPI.delete(id);
      setPaintings(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting painting:', err);
      throw err;
    }
  };

  const updatePainting = async (id: string, painting: Omit<Painting, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const updated = await paintingsAPI.update(id, painting);
      setPaintings(prev =>
        prev.map(p => (p._id === id ? updated : p))
      );
    } catch (err) {
      console.error('Error updating painting:', err);
      throw err;
    }
  };

  const refreshPaintings = async () => {
    await fetchPaintings();
  };

  return (
    <PaintingsContext.Provider
      value={{
        paintings,
        addPainting,
        deletePainting,
        updatePainting,
        loading,
        error,
        refreshPaintings,
      }}
    >
      {children}
    </PaintingsContext.Provider>
  );
};

export const usePaintings = () => {
  const context = useContext(PaintingsContext);
  if (!context) {
    throw new Error('usePaintings must be used within a PaintingsProvider');
  }
  return context;
};
