const Blog = require("../models/blog");


// CREATE
exports.createBlog = async (req, res) => {

    try {

        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.userId
        });

        await blog.save();

        res.status(201).json(blog);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};



// READ ALL
exports.getBlogs = async (req, res) => {

    const blogs = await Blog.find()
        .populate("author", "username email")
        .sort({ createdAt: -1 });

    res.json(blogs);
};



// READ ONE
exports.getBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id)
        .populate("author", "username");

    res.json(blog);
};



// UPDATE
exports.updateBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (blog.author.toString() !== req.userId)
        return res.status(403).json({ message: "Not allowed" });

    const updated = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
};



// DELETE
exports.deleteBlog = async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (blog.author.toString() !== req.userId)
        return res.status(403).json({ message: "Not allowed" });

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
};