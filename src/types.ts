export interface Painting {
  _id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  dimensions: string;
  medium: string;
  year: number;
  category: 'abstract' | 'landscape' | 'portrait' | 'modern' | 'classical';
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Painting {
  quantity: number;
}

