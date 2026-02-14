const router = require("express").Router();

const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/", blogController.getBlogs);

router.get("/:id", blogController.getBlog);

router.post("/", authMiddleware, blogController.createBlog);

router.put("/:id", authMiddleware, blogController.updateBlog);

router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;