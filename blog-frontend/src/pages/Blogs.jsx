import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blogs-page">
      <div className="container">
        <motion.div 
          className="blogs-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <h1>Explore Stories</h1>
            <p>Discover inspiring content from writers around the world</p>
          </div>

          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="blog-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton" style={{ height: '400px' }}></div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <motion.div 
            className="blog-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">📝</div>
            <h3>No stories found</h3>
            <p>Try adjusting your search or explore other categories</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
