// Format price in Indian Rupees
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Format price without symbol
export const formatPriceNumber = (price: number): string => {
  return new Intl.NumberFormat('en-IN').format(price);
};


