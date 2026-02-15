import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { blogService } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const data = await blogService.getBlog(id);
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    try {
      await blogService.deleteBlog(id);
      navigate('/blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete the blog');
    } finally {
      setDeleting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: 'Check out this story on Blogverse',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="skeleton" style={{ height: '60px', marginBottom: '2rem' }}></div>
          <div className="skeleton" style={{ height: '400px', marginBottom: '2rem' }}></div>
          <div className="skeleton" style={{ height: '200px' }}></div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const isAuthor = user && blog.author?._id === user._id;
  const hasCoverImage = blog.media && blog.media.length > 0;

  return (
    <div className="blog-detail-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blogs" className="back-button">
            <ArrowLeft size={20} />
            Back to Stories
          </Link>

          <article className="blog-detail">
            <header className="blog-header">
              <div className="blog-meta">
                <span className="meta-item">
                  <User size={16} />
                  {blog.author?.username || 'Anonymous'}
                </span>
                <span className="meta-item">
                  <Calendar size={16} />
                  {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              <h1 className="blog-title">{blog.title}</h1>

              {token && (
                <div className="blog-actions">
                  <motion.button
                    className="action-btn share-btn"
                    onClick={handleShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={18} />
                    Share
                  </motion.button>

                  {isAuthor && (
                    <>
                      <Link to={`/edit/${blog._id}`}>
                        <motion.button
                          className="action-btn edit-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit size={18} />
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        className="action-btn delete-btn"
                        onClick={handleDelete}
                        disabled={deleting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={18} />
                        {deleting ? 'Deleting...' : 'Delete'}
                      </motion.button>
                    </>
                  )}
                </div>
              )}
            </header>

            {hasCoverImage && (
              <div className="blog-media-grid">
                {blog.media.map((item, index) => (
                  <div key={index} className="media-item">
                    {item.type === 'image' ? (
                      <img src={item.url} alt={`Media ${index + 1}`} />
                    ) : (
                      <video controls src={item.url}></video>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
