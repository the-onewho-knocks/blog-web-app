import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Eye } from 'lucide-react';
import { format } from 'date-fns';
import './BlogCard.css';

const BlogCard = ({ blog, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const getExcerpt = (content, maxLength = 150) => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const hasCoverImage = blog.media && blog.media.length > 0 && blog.media[0].type === 'image';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      className="blog-card"
    >
      <Link to={`/blog/${blog._id}`} className="blog-card-link">
        {hasCoverImage && (
          <div className="blog-card-image">
            <img src={blog.media[0].url} alt={blog.title} />
            <div className="image-overlay"></div>
          </div>
        )}
        
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <span className="meta-item">
              <User size={14} />
              {blog.author?.username || 'Anonymous'}
            </span>
            <span className="meta-item">
              <Calendar size={14} />
              {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>

          <h3 className="blog-card-title">{blog.title}</h3>
          
          <p className="blog-card-excerpt">
            {getExcerpt(blog.content)}
          </p>

          <div className="blog-card-footer">
            <span className="read-more">
              Read More
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>

        <div className="card-glow"></div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
