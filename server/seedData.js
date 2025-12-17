const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Painting = require('./models/Painting');
const connectDB = require('./config/db');

dotenv.config();

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
const convertToINR = (usd) => Math.round(usd * 83);

const paintings = [
  {
    title: "Sunset Dreams",
    artist: "Elena Martinez",
    price: convertToINR(2500),
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1000&fit=crop",
    description: "A mesmerizing abstract piece capturing the warmth and tranquility of a perfect sunset. Rich oranges and deep purples blend seamlessly to create an emotional landscape.",
    dimensions: "36\" x 48\"",
    medium: "Oil on Canvas",
    year: 2023,
    category: 'abstract'
  },
  {
    title: "Mountain Majesty",
    artist: "David Chen",
    price: convertToINR(3200),
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1000&fit=crop",
    description: "A stunning landscape depicting towering peaks shrouded in morning mist. The play of light and shadow brings these mountains to life.",
    dimensions: "40\" x 60\"",
    medium: "Acrylic on Canvas",
    year: 2024,
    category: 'landscape'
  },
  {
    title: "Serene Waters",
    artist: "Michael O'Brien",
    price: convertToINR(2800),
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=1000&fit=crop",
    description: "A peaceful coastal scene that captures the gentle ebb and flow of ocean waves against weathered rocks.",
    dimensions: "48\" x 36\"",
    medium: "Oil on Canvas",
    year: 2024,
    category: 'landscape'
  },
  {
    title: "Contemplation",
    artist: "Isabella Rossi",
    price: convertToINR(4500),
    image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&h=1000&fit=crop",
    description: "An intimate portrait that captures a moment of quiet reflection. The subtle use of light creates an atmosphere of introspection.",
    dimensions: "24\" x 36\"",
    medium: "Oil on Canvas",
    year: 2023,
    category: 'portrait'
  },
  {
    title: "Golden Hour",
    artist: "James Anderson",
    price: convertToINR(2200),
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop",
    description: "A warm, inviting landscape bathed in the magical light of late afternoon. The golden tones evoke a sense of nostalgia and peace.",
    dimensions: "30\" x 45\"",
    medium: "Watercolor",
    year: 2024,
    category: 'landscape'
  },
  {
    title: "Chaos Theory",
    artist: "Alexandra Kim",
    price: convertToINR(3500),
    image: "https://images.unsplash.com/photo-1582561431486-f4b7db1cf84e?w=800&h=1000&fit=crop",
    description: "An explosive abstract composition exploring the beauty within disorder. Dynamic brushstrokes and bold color contrasts create visual excitement.",
    dimensions: "50\" x 50\"",
    medium: "Acrylic on Canvas",
    year: 2023,
    category: 'abstract'
  },
  {
    title: "Classical Beauty",
    artist: "Thomas Wellington",
    price: convertToINR(5200),
    image: "https://images.unsplash.com/photo-1577720643687-9d0b5984f769?w=800&h=1000&fit=crop",
    description: "A masterful classical portrait executed with traditional techniques. Rich color palette and exquisite attention to detail.",
    dimensions: "28\" x 42\"",
    medium: "Oil on Canvas",
    year: 2024,
    category: 'classical'
  },
  {
    title: "Cosmic Dance",
    artist: "Elena Martinez",
    price: convertToINR(2900),
    image: "https://images.unsplash.com/photo-1568359226649-2e19f530e22c?w=800&h=1000&fit=crop",
    description: "An otherworldly abstract piece inspired by the mysteries of space. Swirling forms and luminous colors create a sense of infinite movement.",
    dimensions: "42\" x 54\"",
    medium: "Acrylic on Canvas",
    year: 2024,
    category: 'abstract'
  },
  {
    title: "Forest Whispers",
    artist: "David Chen",
    price: convertToINR(2600),
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
    description: "A enchanting forest scene that draws viewers into a world of dappled light and natural beauty. The depth creates an immersive experience.",
    dimensions: "36\" x 48\"",
    medium: "Oil on Canvas",
    year: 2023,
    category: 'landscape'
  },
  {
    title: "Metropolitan",
    artist: "Sarah Johnson",
    price: convertToINR(3800),
    image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=800&h=1000&fit=crop",
    description: "A striking modern interpretation of urban architecture. Clean lines and bold colors capture the essence of contemporary city living.",
    dimensions: "40\" x 60\"",
    medium: "Acrylic on Canvas",
    year: 2024,
    category: 'modern'
  },
  {
    title: "Autumn Reverie",
    artist: "Michael O'Brien",
    price: convertToINR(2400),
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=1000&fit=crop",
    description: "A celebration of fall's rich palette. Warm ambers, deep reds, and golden yellows capture the beauty of the changing season.",
    dimensions: "32\" x 44\"",
    medium: "Oil on Canvas",
    year: 2023,
    category: 'landscape'
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Painting.deleteMany();

    console.log('📝 Data cleared');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@artgallery.com',
      password: 'admin123',
      isAdmin: true,
    });

    // Create sample user
    await User.create({
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
    });

    console.log('✅ Users imported');

    // Import paintings
    await Painting.insertMany(paintings);

    console.log('✅ Paintings imported with INR prices');
    console.log('🎉 Data Import Success!');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Painting.deleteMany();

    console.log('🗑️  Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}


