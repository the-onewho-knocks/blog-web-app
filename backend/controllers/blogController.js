const Blog = require("../models/blog");
const cloudinary = require("../config/cloudinary");



exports.createBlog = async (req, res) => {

    try {

        let media = [];

        if (req.files) {

            for (let file of req.files) {

                const base64 =
                    file.buffer.toString("base64");

                const result =
                    await cloudinary.uploader.upload(
                        `data:${file.mimetype};base64,${base64}`,
                        {
                            resource_type: "auto"
                        }
                    );

                media.push({

                    url: result.secure_url,

                    type:
                        result.resource_type === "video"
                            ? "video"
                            : "image"

                });

            }

        }

        const blog =
            new Blog({

                title: req.body.title,

                content: req.body.content,

                author: req.userId,

                media

            });

        await blog.save();

        res.status(201).json(blog);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



exports.getBlogs = async (req, res) => {

    const blogs =
        await Blog.find()
            .populate("author", "username email")
            .sort({ createdAt: -1 });

    res.json(blogs);

};



exports.getBlog = async (req, res) => {

    const blog =
        await Blog.findById(req.params.id)
            .populate("author", "username");

    res.json(blog);

};



exports.updateBlog = async (req, res) => {

    const blog =
        await Blog.findById(req.params.id);

    if (blog.author.toString() !== req.userId)
        return res.status(403).json({
            message: "Not allowed"
        });

    const updated =
        await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(updated);

};



exports.deleteBlog = async (req, res) => {

    const blog =
        await Blog.findById(req.params.id);

    if (blog.author.toString() !== req.userId)
        return res.status(403).json({
            message: "Not allowed"
        });

    await Blog.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message: "Deleted"
    });

};