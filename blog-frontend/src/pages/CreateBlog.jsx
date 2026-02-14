import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, Send, X, Image as ImageIcon, Video } from 'lucide-react';
import { blogService } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import './CreateBlog.css';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (files.length + selectedFiles.length > 10) {
      setError('Maximum 10 files allowed');
      return;
    }

    setFiles([...files, ...selectedFiles]);

    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, {
          url: reader.result,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      setError('Content is required');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      
      files.forEach(file => {
        data.append('media', file);
      });

      const result = await blogService.createBlog(data);
      navigate(`/blog/${result._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="container">
        <motion.div
          className="create-blog-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="page-header">
            <h1>Create Your Story</h1>
            <p>Share your thoughts with the world</p>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter an engaging title..."
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <div className="editor-wrapper">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={modules}
                  placeholder="Tell your story..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Media (Images & Videos)</label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                multiple
                style={{ display: 'none' }}
              />

              <motion.button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload size={20} />
                Upload Media
              </motion.button>

              {previews.length > 0 && (
                <div className="media-previews">
                  {previews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      {preview.type === 'image' ? (
                        <img src={preview.url} alt={preview.name} />
                      ) : (
                        <div className="video-preview">
                          <Video size={32} />
                          <span>{preview.name}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFile(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Publishing...' : 'Publish Story'}
              <Send size={20} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;
