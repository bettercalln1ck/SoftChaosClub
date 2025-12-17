# 🎨 Art Gallery E-Commerce Website

A beautiful, full-stack e-commerce website for selling paintings with MongoDB database, Express backend, and React frontend. All prices in **Indian Rupees (₹)**.

![Art Gallery](https://img.shields.io/badge/Status-Production%20Ready-success)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

---

## ✨ Features

### 🛍️ **E-Commerce Features**
- Browse 11 curated paintings
- Add to cart functionality
- Shopping cart with INR totals
- Secure checkout (requires login)
- Responsive design for all devices

### 👤 **User Features**
- User registration and login
- Profile management with avatar
- Session persistence
- Protected account pages
- Order preparation

### 🔐 **Admin Features**
- Separate admin authentication
- Add new paintings
- Delete paintings
- View collection statistics
- Total value in INR

### 💻 **Technical Features**
- MongoDB database
- RESTful API with Express
- JWT authentication
- Password hashing (bcrypt)
- TypeScript frontend
- React Context API
- Indian Rupee (₹) pricing
- WiFi network access

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (v7.0+)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to project:
```bash
cd /Users/nikhilkumar/Documents/IrineSite
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install and start MongoDB:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb/brew/mongodb-community@7.0
```

4. **Seed the database:**
```bash
npm run seed
```

5. **Start the backend server:**
```bash
npm run server
```

6. **Start the frontend** (in a new terminal):
```bash
npm run dev
```

7. **Access the website:**
   - Frontend: http://192.168.1.7:5173 (WiFi accessible)
   - Backend API: http://localhost:5001/api

---

## 📚 Documentation

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Complete database setup guide
- **[USER_AUTH_GUIDE.md](./USER_AUTH_GUIDE.md)** - User authentication documentation
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Admin panel usage guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

---

## 🔑 Default Accounts

### Admin Account
- **Email:** admin@artgallery.com
- **Password:** admin123
- **Access:** http://192.168.1.7:5173/admin/login

### Test User Account
- **Email:** john@example.com
- **Password:** password123
- **Access:** http://192.168.1.7:5173/login

---

## 💰 Pricing

All prices are in **Indian Rupees (₹)**

| Painting | Artist | Price |
|----------|--------|-------|
| Sunset Dreams | Elena Martinez | ₹2,07,500 |
| Mountain Majesty | David Chen | ₹2,65,600 |
| Serene Waters | Michael O'Brien | ₹2,32,400 |
| Contemplation | Isabella Rossi | ₹3,73,500 |
| Golden Hour | James Anderson | ₹1,82,600 |
| Chaos Theory | Alexandra Kim | ₹2,90,500 |
| Classical Beauty | Thomas Wellington | ₹4,31,600 |
| Cosmic Dance | Elena Martinez | ₹2,40,700 |
| Forest Whispers | David Chen | ₹2,15,800 |
| Metropolitan | Sarah Johnson | ₹3,15,400 |
| Autumn Reverie | Michael O'Brien | ₹1,99,200 |

**Total Collection Value:** ₹29,54,900

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB 7.0** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

---

## 📁 Project Structure

```
IrineSite/
├── server/                  # Backend API
│   ├── config/             # Database config
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Express server
│   └── seedData.js         # Database seeding
│
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── context/            # Context providers
│   ├── services/           # API client
│   └── utils/              # Utility functions
│
├── .env.local              # Frontend env vars
├── package.json            # Dependencies
└── README.md               # This file
```

---

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
npm run server       # Start backend server
npm run server:dev   # Start with auto-restart
```

### Database
```bash
npm run seed         # Seed database with data
npm run seed:destroy # Clear all database data
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Paintings
- `GET /api/paintings` - Get all paintings
- `GET /api/paintings/:id` - Get single painting
- `POST /api/paintings` - Create painting (admin only)
- `PUT /api/paintings/:id` - Update painting (admin only)
- `DELETE /api/paintings/:id` - Delete painting (admin only)

---

## 🔐 Security

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication (30-day expiry)
- ✅ Protected routes (admin-only endpoints)
- ✅ Input validation (Mongoose schemas)
- ✅ CORS configuration
- ✅ Environment variables for secrets

---

## 📱 Screenshots

### Homepage
Beautiful hero section with featured paintings in INR

### Gallery
Grid layout with all paintings, filters, and search

### Shopping Cart
Cart summary with INR totals and checkout

### User Account
Profile management with avatar and quick actions

### Admin Dashboard
Painting management with statistics in INR

---

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy backend

### Frontend (Vercel/Netlify)
1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

---

## 🐛 Troubleshooting

### MongoDB not running
```bash
brew services start mongodb/brew/mongodb-community@7.0
```

### Port 5000 already in use
Port 5001 is used instead (AirTunes uses 5000 on macOS)

### Frontend not connecting to backend
Check `.env.local` has correct API URL:
```env
VITE_API_URL=http://localhost:5001/api
```

### Database is empty
Run the seed command:
```bash
npm run seed
```

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Developer

Built with ❤️ using React, Express, and MongoDB

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Razorpay)
- [ ] Order management system
- [ ] Email notifications
- [ ] Image upload functionality
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Advanced search and filters
- [ ] Pagination
- [ ] Order tracking
- [ ] Invoice generation

---

## 📞 Support

For issues or questions, refer to the documentation files:
- Database issues → `DATABASE_SETUP.md`
- User auth issues → `USER_AUTH_GUIDE.md`
- Admin panel → `ADMIN_GUIDE.md`
- Technical details → `IMPLEMENTATION_SUMMARY.md`

---

**🎨 Happy Selling!** 🚀
