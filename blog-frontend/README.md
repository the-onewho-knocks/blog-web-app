# Blogverse - Beautiful Blog Platform Frontend

A stunning, modern React blog application with a sophisticated dark theme and premium UI/UX design.

## ✨ Features

- **Beautiful UI/UX**: Elegant dark theme with sophisticated color palette and typography
- **Rich Text Editor**: Full-featured editor with formatting options
- **Media Support**: Upload and display images and videos
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Delightful micro-interactions using Framer Motion
- **User Authentication**: Secure login and registration
- **Blog Management**: Create, edit, delete, and share blog posts
- **Search Functionality**: Find blogs quickly with real-time search
- **Protected Routes**: Authentication-required pages

## 🎨 Design Features

- Custom typography using Playfair Display, Crimson Text, and Syne
- Sophisticated color system with accent gradients
- Glassmorphism effects and subtle shadows
- Animated background patterns and noise textures
- Smooth page transitions and hover effects
- Loading skeletons for better UX

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🛠️ Technology Stack

- **React 18** - UI library
- **React Router** - Routing
- **Framer Motion** - Animations
- **React Quill** - Rich text editor
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **Lucide React** - Icons
- **Vite** - Build tool

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Navbar.css
│   ├── BlogCard.jsx
│   └── BlogCard.css
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Auth.css
│   ├── Blogs.jsx
│   ├── Blogs.css
│   ├── BlogDetail.jsx
│   ├── BlogDetail.css
│   ├── CreateBlog.jsx
│   └── CreateBlog.css
├── context/
│   └── AuthContext.jsx
├── services/
│   └── blogService.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## 🎯 Key Pages

### Home
- Hero section with engaging CTAs
- Featured blog posts
- Statistics display
- Animated visual elements

### Blogs
- Grid layout of all blog posts
- Real-time search functionality
- Responsive card design
- Loading states

### Blog Detail
- Full blog content display
- Media gallery
- Author information
- Share functionality
- Edit/Delete options (for authors)

### Create/Edit Blog
- Rich text editor
- Media upload (up to 10 files)
- Image and video preview
- Real-time validation

### Authentication
- Login and registration forms
- Error handling
- Beautiful glassmorphic design
- Animated background effects

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. User logs in with email and password
3. JWT token stored in localStorage
4. Token sent with authenticated requests
5. Protected routes check authentication status

## 🎨 Color System

- **Background**: Deep dark tones (#0a0a0f, #13131a)
- **Text**: Light grays for readability
- **Accent**: Orange gradient (#ff6b35 → #f7931e)
- **Borders**: Subtle rgba values for depth

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🌟 Best Practices

- Component-based architecture
- Separation of concerns
- Reusable components
- CSS modules for styling
- Proper error handling
- Loading states
- Optimistic UI updates

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Fonts for typography
- Lucide for beautiful icons
- Framer Motion for smooth animations
- React Quill for the rich text editor
