import axios from 'axios';

const API_URL = '/api/blogs';

export const blogService = {
  // Get all blogs
  getAllBlogs: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get single blog
  getBlog: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create blog
  createBlog: async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Update blog
  updateBlog: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
