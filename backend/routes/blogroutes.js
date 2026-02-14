const router = require("express").Router();

const blogController =
    require("../controllers/blogController");

const authMiddleware =
    require("../middleware/authmiddleware");

const upload =
    require("../middleware/uploadmiddleware");



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