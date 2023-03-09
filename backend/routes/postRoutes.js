const express = require("express")
const { protect } = require("../controllers/authController")
const { createPost, deletePost } = require("../controllers/postController")
const router = express.Router()

router.route("/post/upload")
    .post(protect, createPost)
router.route("/post/:id")
    .delete(protect, deletePost)
module.exports = router