# 🚀 Quick Start Guide

## Prerequisites Checklist

- ✅ Node.js v16+ installed
- ✅ npm or yarn installed  
- ✅ Backend server running on port 5000
- ✅ MongoDB connected

## Installation Steps

### 1. Install Dependencies

```bash
cd blog-frontend
npm install
```

This will install all required packages:
- react & react-dom
- react-router-dom
- axios
- framer-motion
- react-quill
- date-fns
- lucide-react
- vite

### 2. Start Development Server

```bash
npm run dev
```

The app will open at: **http://localhost:3000**

### 3. Test the Application

1. **Register a new account**
   - Navigate to `/register`
   - Fill in username, email, and password
   - Click "Create Account"

2. **Login**
   - Navigate to `/login`
   - Enter your credentials
   - Click "Sign In"

3. **Create a blog post**
   - Click "Create" in the navbar
   - Enter title and content
   - Optionally upload images/videos
   - Click "Publish Story"

4. **Explore blogs**
   - Navigate to `/blogs`
   - Use search to find specific posts
   - Click on any blog to read full content

## Backend Configuration

Make sure your backend is running with these endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)

## Environment Setup

The Vite config is set to proxy API requests:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

If your backend runs on a different port, update `vite.config.js`.

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
vite --port 3001
```

### Backend Connection Issues
- Verify backend is running on port 5000
- Check CORS is enabled on backend
- Ensure MongoDB is connected

### Dependencies Installation Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## Features to Test

✅ User Registration & Login
✅ Create Blog with Rich Text
✅ Upload Images & Videos  
✅ Edit Own Blogs
✅ Delete Own Blogs
✅ Search Blogs
✅ Responsive Design
✅ Share Functionality
✅ Beautiful Animations

## Next Steps

1. Customize the color scheme in `src/styles/global.css`
2. Add your own logo/branding
3. Implement additional features like:
   - Comments
   - Likes/Reactions
   - User profiles
   - Categories/Tags
   - Pagination
   - Draft saves

Enjoy building with Blogverse! 🎉
