# Blogverse - Full Stack Blog Platform

A beautiful, modern full-stack blog application with React frontend and Node.js/Express backend. Features sophisticated dark theme, rich text editing, media uploads, and seamless user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

Blogverse is a full-stack blog platform that allows users to create, share, and discover stories. Built with modern technologies and best practices, it features a sophisticated dark UI, rich text editing, and seamless media uploads.

### Live Demo
```
 Frontend: http://localhost:3000
 Backend API: http://localhost:5000
```

## Features

### Frontend Features
- **Sophisticated Dark Theme** with orange gradient accents
- **Premium Typography** (Playfair Display, Crimson Text, Syne)
- **Rich Text Editor** with full formatting capabilities
- **Media Gallery** with image and video support
- **Real-time Search** across all blog posts
- **Smooth Animations** using Framer Motion
- **Fully Responsive** design for all devices
- **Share Functionality** with native API
- **Loading Skeletons** for better UX

### Backend Features
- **RESTful API** with Express.js
- **JWT Authentication** with bcrypt hashing
- **MongoDB Database** with Mongoose ODM
- **Cloudinary Integration** for media storage
- **File Upload** with Multer middleware
- **Authorization** for protected routes
- **CORS Support** for cross-origin requests
- **Error Handling** with proper status codes

### Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Protected routes and endpoints
- Owner-only edit/delete permissions
- Secure password hashing

### Blog Management
- Create blog posts with rich text
- Upload up to 10 images/videos per post
- Edit and update own posts
- Delete own posts
- View all published blogs
- Search functionality

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| React Router 6 | Client-side Routing |
| Vite | Build Tool & Dev Server |
| Framer Motion | Animations |
| React Quill | Rich Text Editor |
| Axios | HTTP Client |
| date-fns | Date Formatting |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Multer | File Upload |
| Cloudinary | Media Storage |

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn** (comes with Node.js)
- **Cloudinary Account** ([Sign up](https://cloudinary.com/))

Optional:
- Git for version control
- Postman for API testing
- VS Code or your preferred IDE

##  Quick Start

### Complete Installation (Both Backend & Frontend)

```bash
# 1. Clone the repository
git clone <repository-url>
cd blogverse

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Setup Backend Environment
cp .env.example .env
# Edit .env with your credentials (see Backend Setup section)

# 4. Start Backend Server
npm start
# Backend runs on http://localhost:5000

# 5. In a new terminal, Install Frontend Dependencies
cd ../frontend
npm install

# 6. Start Frontend Development Server
npm run dev
# Frontend runs on http://localhost:3000

# 7. Open browser and navigate to http://localhost:3000
```

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/blogverse
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogverse

# JWT Secret (Change this!)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Step 4: Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Find your credentials:
   - Cloud Name
   - API Key
   - API Secret
4. Add them to your `.env` file

### Step 5: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Your connection string:
MONGO_URI=mongodb://localhost:27017/blogverse
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>` with your database user credentials
6. Add to `.env` file

### Step 6: Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:5000`

### Backend API Endpoints

```
Authentication:
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user

Blogs:
GET    /api/blogs             - Get all blogs
GET    /api/blogs/:id         - Get single blog
POST   /api/blogs             - Create blog (protected)
PUT    /api/blogs/:id         - Update blog (protected)
DELETE /api/blogs/:id         - Delete blog (protected)
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Backend URL (Optional)

The frontend is pre-configured to connect to `http://localhost:5000`. If your backend runs on a different port, update `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:YOUR_PORT', // Change this
        changeOrigin: true
      }
    }
  }
})
```

### Step 4: Start Development Server

```bash
npm run dev
```

Application will open at `http://localhost:3000`

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
blogverse/
│
├── backend/                    # Backend API
│   ├── config/
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── blogController.js  # Blog CRUD operations
│   ├── middleware/
│   │   ├── authmiddleware.js  # JWT verification
│   │   └── uploadmiddleware.js # Multer file upload
│   ├── models/
│   │   ├── user.js            # User schema
│   │   └── blog.js            # Blog schema
│   ├── routes/
│   │   ├── authroutes.js      # Auth endpoints
│   │   └── blogroutes.js      # Blog endpoints
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── BlogCard.jsx
│   │   │   └── BlogCard.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Auth.css
│   │   │   ├── Blogs.jsx
│   │   │   ├── Blogs.css
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── BlogDetail.css
│   │   │   ├── CreateBlog.jsx
│   │   │   └── CreateBlog.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── blogService.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md                   # This file
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Blog Endpoints

#### Get All Blogs
```http
GET /api/blogs

Response: 200 OK
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "title": "My First Blog",
    "content": "<p>Blog content...</p>",
    "author": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "media": [
      {
        "url": "https://res.cloudinary.com/...",
        "type": "image"
      }
    ],
    "createdAt": "2024-02-14T10:30:00.000Z"
  }
]
```

#### Create Blog (Protected)
```http
POST /api/blogs
Authorization: <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data:
- title: "My New Blog"
- content: "<p>Rich text content...</p>"
- media: [file1.jpg, file2.png]

Response: 201 Created
{
  "_id": "60d5ec49f1b2c72b8c8e4f1c",
  "title": "My New Blog",
  "content": "<p>Rich text content...</p>",
  "author": "60d5ec49f1b2c72b8c8e4f1a",
  "media": [...]
}
```

#### Update Blog (Protected)
```http
PUT /api/blogs/:id
Authorization: <JWT_TOKEN>
Content-Type: application/json

Request Body:
{
  "title": "Updated Title",
  "content": "<p>Updated content...</p>"
}
```

#### Delete Blog (Protected)
```http
DELETE /api/blogs/:id
Authorization: <JWT_TOKEN>

Response: 200 OK
{
  "message": "Deleted"
}
```

## Environment Variables

### Backend (.env)
```env
# Required
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_at_least_32_characters
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Optional
NODE_ENV=development
```

### Frontend
No environment variables needed. API proxy configured in `vite.config.js`.

## Design System

### Color Palette
```css
/* Dark Theme */
Primary Background: #0a0a0f
Secondary Background: #13131a
Tertiary Background: #1a1a24

/* Text Colors */
Primary Text: #f5f5f7
Secondary Text: #a8a8b3
Tertiary Text: #6b6b7a

/* Accent Colors */
Primary Accent: #ff6b35 (Orange)
Secondary Accent: #ffa07a (Light Coral)
Gradient: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)
```

### Typography
- **Display Font**: Playfair Display (Headings)
- **Body Font**: Crimson Text (Content)
- **Accent Font**: Syne (UI Elements)

### Spacing System
```css
--spacing-xs: 0.5rem    (8px)
--spacing-sm: 1rem      (16px)
--spacing-md: 1.5rem    (24px)
--spacing-lg: 2.5rem    (40px)
--spacing-xl: 4rem      (64px)
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## Deployment

### Backend Deployment

#### Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create blogverse-api

# Set environment variables
heroku config:set MONGO_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set CLOUD_NAME=<cloudinary-name>
heroku config:set API_KEY=<cloudinary-key>
heroku config:set API_SECRET=<cloudinary-secret>

# Deploy
git push heroku main
```

#### DigitalOcean / AWS / VPS
```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js and MongoDB
# Clone repository
git clone <your-repo>
cd backend

# Install dependencies
npm install --production

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start server.js --name blogverse-api

# Setup auto-restart
pm2 startup
pm2 save

# Setup Nginx reverse proxy (optional)
```

### Frontend Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow prompts
# Set build command: npm run build
# Set output directory: dist
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend directory
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/blogverse",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Environment Configuration for Production

**Backend**:
- Set `NODE_ENV=production`
- Use MongoDB Atlas (cloud database)
- Enable HTTPS
- Configure CORS for your frontend domain
- Use strong JWT_SECRET (64+ characters)

**Frontend**:
- Update API endpoint in production build
- Enable HTTPS
- Configure proper CORS
- Optimize images
- Enable caching

## Testing

### Backend Testing
```bash
cd backend

# Install dev dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Testing
```bash
cd frontend

# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Manual Testing Checklist
- [ ] User registration works
- [ ] User login works
- [ ] Create blog with text only
- [ ] Create blog with images
- [ ] Create blog with videos
- [ ] Edit own blog
- [ ] Delete own blog
- [ ] Search functionality
- [ ] Share functionality
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] All animations work
- [ ] Loading states display
- [ ] Error messages show properly

## Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB if not running

# Check if port 5000 is available
lsof -i :5000
# Kill process if needed
kill -9 <PID>

# Check environment variables
cat .env
```

#### Frontend can't connect to backend
```bash
# Verify backend is running
curl http://localhost:5000/api/blogs

# Check proxy configuration in vite.config.js
# Clear browser cache
# Check CORS settings in backend
```

#### Cloudinary upload fails
```bash
# Verify credentials in .env
# Check Cloudinary dashboard for API limits
# Ensure file size is under 100MB
```

#### MongoDB connection error
```bash
# Check MongoDB is running
mongosh

# Verify connection string in .env
# Check network access in MongoDB Atlas
# Whitelist IP address in Atlas
```

#### JWT token issues
```bash
# Verify JWT_SECRET is set
# Check token expiry (7 days default)
# Clear localStorage and login again
```

### Error Messages

| Error | Solution |
|-------|----------|
| `EADDRINUSE` | Port already in use, kill process or change port |
| `MongoServerSelectionError` | MongoDB not running or wrong connection string |
| `401 Unauthorized` | Token invalid or expired, login again |
| `403 Forbidden` | Trying to edit/delete someone else's post |
| `Failed to fetch` | Backend not running or CORS issue |

### Debug Mode

**Backend**:
```bash
# Enable debug logging
DEBUG=* npm start
```

**Frontend**:
```bash
# Open React DevTools in browser
# Check console for errors
# Use Network tab to inspect API calls
```

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs
1. Check if bug already exists in Issues
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Feature Requests
1. Open new issue
2. Describe the feature
3. Explain use case
4. Optional: Provide mockups

### Pull Requests
1. Fork the repository
2. Create feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Commit with clear message
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
5. Push to branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open Pull Request

### Code Style
- Use ESLint configuration
- Follow existing patterns
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React Team** for the amazing library
- **Cloudinary** for media storage
- **MongoDB** for the database
- **Vercel** for Vite build tool
- **Google Fonts** for beautiful typography
- **Lucide** for icon library
- **Framer** for Motion library

## Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/blogverse/issues)
- **Email**: your-email@example.com
- **Documentation**: [Wiki](https://github.com/yourusername/blogverse/wiki)

## Roadmap

### Version 2.0 (Planned)
- [ ] Comments system
- [ ] Like/Unlike posts
- [ ] User profiles with avatars
- [ ] Follow/Unfollow users
- [ ] Categories and tags
- [ ] Bookmarks
- [ ] Email notifications
- [ ] Draft posts
- [ ] Advanced search filters
- [ ] Analytics dashboard

### Version 3.0 (Future)
- [ ] Real-time collaboration
- [ ] AI-powered content suggestions
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] SEO optimization
- [ ] Advanced analytics
- [ ] Premium features
- [ ] API rate limiting

## Stats

```
Total Files: 50+
Lines of Code: 5000+
Components: 15+
API Endpoints: 7
Pages: 6
Development Time: 40+ hours
```

## Quick Tips

1. **First Time Setup**: Follow the Quick Start guide step-by-step
2. **Development**: Use two terminal windows (backend + frontend)
3. **Testing**: Use Postman to test API endpoints
4. **Debugging**: Check browser console and network tab
5. **Performance**: Use React DevTools Profiler
6. **Security**: Never commit `.env` files
7. **Updates**: Keep dependencies updated regularly

---

## Ready to Start?

```bash
# Clone the repo
git clone <repository-url>

# Setup backend
cd backend && npm install && npm start

# Setup frontend (in new terminal)
cd frontend && npm install && npm run dev

# Visit http://localhost:3000
# Start building amazing blogs! 
```

---

**Made with ❤️ by Blogverse Team**

*Happy Blogging! 📝✨*
