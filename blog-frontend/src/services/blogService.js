import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const blogService = {

  getAllBlogs: async () => {
    const res = await api.get("/blogs");
    return res.data;
  },

  getBlog: async (id) => {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  },

  createBlog: async (formData) => {
    const res = await api.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  },

  updateBlog: async (id, data) => {
    const res = await api.put(`/blogs/${id}`, data);
    return res.data;
  },

  deleteBlog: async (id) => {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  }

};