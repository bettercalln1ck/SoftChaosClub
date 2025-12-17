import type { Painting } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get token
const getAuthToken = () => {
  const user = localStorage.getItem('apiUser');
  if (user) {
    const parsed = JSON.parse(user);
    return parsed.token;
  }
  return null;
};

// Helper function to create headers
const getHeaders = (includeAuth = false) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Auth API
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: getHeaders(true),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  updateProfile: async (name: string) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};

// Paintings API
export const paintingsAPI = {
  getAll: async (): Promise<Painting[]> => {
    const response = await fetch(`${API_URL}/paintings`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    // Convert MongoDB _id to id for frontend compatibility
    return data.map((painting: any) => ({
      ...painting,
      id: painting._id,
    }));
  },

  getById: async (id: string): Promise<Painting> => {
    const response = await fetch(`${API_URL}/paintings/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { ...data, id: data._id };
  },

  create: async (painting: Omit<Painting, 'id'>) => {
    const response = await fetch(`${API_URL}/paintings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(painting),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { ...data, id: data._id };
  },

  update: async (id: string, painting: Partial<Painting>) => {
    const response = await fetch(`${API_URL}/paintings/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(painting),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { ...data, id: data._id };
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/paintings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};

// Check API health
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};


