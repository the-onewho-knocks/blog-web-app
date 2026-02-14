import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';
import './Home.css';

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAllBlogs();
        setFeaturedBlogs(blogs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="hero-content">
            <motion.div className="hero-badge" variants={itemVariants}>
              <Sparkles size={16} />
              <span>Where Stories Come Alive</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Share Your Voice,
              <br />
              <span className="gradient-text">Inspire The World</span>
            </motion.h1>

            <motion.p className="hero-description" variants={itemVariants}>
              Join a community of passionate writers and readers. 
              Create, share, and discover stories that matter.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/blogs">
                <motion.button 
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Stories
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/create">
                <motion.button 
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Writing
                </motion.button>
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat-item">
                <TrendingUp className="stat-icon" />
                <div>
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Stories Published</div>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <Sparkles className="stat-icon" />
                <div>
                  <div className="stat-number">5K+</div>
                  <div className="stat-label">Active Writers</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-avatar"></div>
                  <div className="card-meta">
                    <div className="card-author"></div>
                    <div className="card-date"></div>
                  </div>
                </div>
                <div className="card-title"></div>
                <div className="card-text"></div>
                <div className="card-text short"></div>
                <div className="card-image"></div>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-avatar"></div>
                  <div className="card-meta">
                    <div className="card-author"></div>
                    <div className="card-date"></div>
                  </div>
                </div>
                <div className="card-title"></div>
                <div className="card-text"></div>
                <div className="card-text"></div>
                <div className="card-text short"></div>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-avatar"></div>
                  <div className="card-meta">
                    <div className="card-author"></div>
                    <div className="card-date"></div>
                  </div>
                </div>
                <div className="card-title"></div>
                <div className="card-text"></div>
                <div className="card-text short"></div>
                <div className="card-image"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Blogs Section */}
      <section className="featured-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Featured Stories</h2>
            <p>Discover the most inspiring content from our community</p>
          </motion.div>

          {loading ? (
            <div className="blog-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ height: '400px' }}></div>
              ))}
            </div>
          ) : featuredBlogs.length > 0 ? (
            <div className="blog-grid">
              {featuredBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No stories yet. Be the first to share your story!</p>
              <Link to="/create">
                <motion.button 
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Your First Story
                </motion.button>
              </Link>
            </div>
          )}

          {featuredBlogs.length > 0 && (
            <motion.div 
              className="view-all-container"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to="/blogs">
                <motion.button 
                  className="btn-view-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Stories
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
