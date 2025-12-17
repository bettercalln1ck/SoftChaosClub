export interface Painting {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  dimensions: string;
  medium: string;
  year: number;
  category: 'abstract' | 'landscape' | 'portrait' | 'modern' | 'classical';
}

export interface CartItem extends Painting {
  quantity: number;
}

