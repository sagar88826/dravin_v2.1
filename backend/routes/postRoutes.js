const express = require("express")
const { protect } = require("../controllers/authController")
const { createPost, deletePost, likeDislike, comments, followeePost, myPost } = require("../controllers/postController")
const router = express.Router()

router.route("/post/upload")
    .post(protect, createPost)
router.route("/post/:id")
    .delete(protect, deletePost)
router.route("/post/likes/:id")
    .get(protect, likeDislike)
router.route("/post/comment/:id")
    .post(protect, comments)
router.route("/post/followee-post")
    .get(protect, followeePost)
router.route("/post/my-post")
    .get(protect, myPost)

module.exports = router