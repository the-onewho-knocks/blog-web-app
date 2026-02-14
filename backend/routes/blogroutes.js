const router = require("express").Router();

const blogController =
    require("../controllers/blogController");

const authMiddleware =
    require("../middleware/authmiddleware");

const upload =
    require("../middleware/uploadmiddleware");

    router.post("/test", async (req, res) => {
  const Blog = require("../models/blog"); // adjust path if needed

  const blog = new Blog({
    title: "First production blog",
    content: "Stored in MongoDB Atlas via Railway",
    author: "railway-test",
    media: []
  });

  await blog.save();

  res.json(blog);
});


router.get(
    "/",
    blogController.getBlogs
);

router.get(
    "/:id",
    blogController.getBlog
);

router.post(
    "/",
    authMiddleware,
    upload.array("media", 10),
    blogController.createBlog
);

router.put(
    "/:id",
    authMiddleware,
    blogController.updateBlog
);

router.delete(
    "/:id",
    authMiddleware,
    blogController.deleteBlog
);

module.exports = router;