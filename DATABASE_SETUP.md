# Database Setup Guide

## 🗄️ MongoDB Database Setup

Your art gallery website now uses a **MongoDB database** for storing all products, users, and data!

## Prerequisites

### Install MongoDB

#### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

#### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Start MongoDB service from Services

#### Linux (Ubuntu/Debian):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## Project Structure

```
IrineSite/
├── server/                    # Backend API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Painting.js       # Painting schema
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── paintings.js      # Paintings CRUD routes
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── server.js             # Express server
│   └── seedData.js           # Database seeding script
├── src/                       # Frontend React app
│   ├── services/
│   │   └── api.ts            # API client
│   └── ...
├── .env                       # Environment variables
└── package.json
```

## Setup Instructions

### 1. Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh
# You should see MongoDB shell
# Type 'exit' to quit
```

### 2. Configure Environment Variables

The `.env` file has been created with:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/artgallery
JWT_SECRET=artgallery-secret-key-2024
```

### 3. Seed the Database

Populate the database with initial data (paintings and users):

```bash
npm run seed
```

This will:
- Clear existing data
- Create admin user (email: admin@artgallery.com, password: admin123)
- Create test user (email: john@example.com, password: password123)
- Import 11 paintings with **INR prices**

### 4. Start the Backend Server

```bash
npm run server
```

Or for development with auto-restart:
```bash
npm run server:dev
```

The server will run on: **http://localhost:5000**

### 5. Start the Frontend

In a new terminal:
```bash
npm run dev
```

The frontend will run on: **http://localhost:5173**

## Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  isAdmin: Boolean,
  createdAt: Date,
  timestamps: true
}
```

### Painting Schema
```javascript
{
  title: String,
  artist: String,
  price: Number (in INR),
  image: String (URL),
  description: String,
  dimensions: String,
  medium: String,
  year: Number,
  category: String (abstract, landscape, portrait, modern, classical),
  createdAt: Date,
  timestamps: true
}
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Paintings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/paintings` | Get all paintings | No |
| GET | `/api/paintings/:id` | Get single painting | No |
| POST | `/api/paintings` | Create painting | Admin Only |
| PUT | `/api/paintings/:id` | Update painting | Admin Only |
| DELETE | `/api/paintings/:id` | Delete painting | Admin Only |

## Price Conversion

All prices have been converted from USD to INR:
- **Conversion Rate:** 1 USD = ₹83
- **Display Format:** Indian number format (e.g., ₹2,07,500)
- **Currency Symbol:** ₹ (Indian Rupee)

### Example Conversions:
- $2,500 → ₹2,07,500
- $3,200 → ₹2,65,600
- $4,500 → ₹3,73,500

## Testing

### 1. Test API Health
```bash
curl http://localhost:5000/api/health
```

### 2. Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### 4. Test Get Paintings
```bash
curl http://localhost:5000/api/paintings
```

## Default Accounts

### Admin Account
- **Email:** admin@artgallery.com
- **Password:** admin123
- **Access:** Full admin dashboard access

### Test User Account
- **Email:** john@example.com
- **Password:** password123
- **Access:** Regular user access

## Database Management

### View Database
```bash
mongosh
use artgallery
db.paintings.find().pretty()
db.users.find().pretty()
```

### Clear Database
```bash
npm run seed:destroy
```

### Re-seed Database
```bash
npm run seed
```

### Backup Database
```bash
mongodump --db artgallery --out ./backup
```

### Restore Database
```bash
mongorestore --db artgallery ./backup/artgallery
```

## Troubleshooting

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Connection Error
- Check if MongoDB is running: `mongosh`
- Verify MONGODB_URI in `.env`
- Check port 27017 is not in use

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

### Seed Data Not Loading
```bash
# Clear and re-seed
npm run seed:destroy
npm run seed
```

## Security Features

### Password Security
- ✅ **bcrypt hashing** - Passwords are hashed before storage
- ✅ **Salt rounds:** 10
- ✅ **Never stored in plaintext**

### JWT Authentication
- ✅ **Token-based auth** - Secure session management
- ✅ **30-day expiry** - Tokens expire automatically
- ✅ **Bearer token** - Sent in Authorization header

### API Security
- ✅ **CORS enabled** - Cross-origin requests allowed
- ✅ **Protected routes** - Admin-only endpoints
- ✅ **Input validation** - Mongoose schema validation

## Production Deployment

### Environment Variables
Update `.env` for production:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artgallery
JWT_SECRET=your-super-secret-production-key-min-32-chars
```

### MongoDB Atlas (Cloud Database)
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in `.env`

### Deploy Backend
- **Heroku:** `git push heroku main`
- **Railway:** Connect GitHub repo
- **DigitalOcean:** Use App Platform

### Deploy Frontend
- **Vercel:** `vercel --prod`
- **Netlify:** Connect GitHub repo
- **GitHub Pages:** `npm run build` and deploy

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run server` | Start backend server |
| `npm run server:dev` | Start backend with nodemon |
| `npm run seed` | Seed database with data |
| `npm run seed:destroy` | Clear all database data |
| `npm run build` | Build frontend for production |

## Features

### ✅ Implemented
- MongoDB database with Mongoose ODM
- User authentication with JWT
- Password hashing with bcrypt
- RESTful API with Express
- CRUD operations for paintings
- Admin authentication
- INR currency conversion
- Indian number formatting

### 🚀 Future Enhancements
- Order management system
- Payment gateway integration (Razorpay/Stripe)
- Image upload to cloud (Cloudinary/AWS S3)
- Email notifications
- Advanced search and filters
- Reviews and ratings
- Wishlist functionality

---

**Your database is now ready!** 🎉

Start both servers and enjoy your full-stack art gallery with MongoDB! 🎨🗄️


