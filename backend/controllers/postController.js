const Post = require("../models/postModel")
const User = require('../models/userModel')

exports.createPost = async (req, res) => {
    try {
        const newPost = {
            caption: req.body.caption,
            image: {
                public_id: "coming soon",
                url: "/"
            },
            owner: req.user._id
        }
        const post = await Post.create(newPost)
        const user = await User.findById(req.user._id)

        user.posts.unshift(post._id)

        await user.save()
        console.log("post")

        res.status(201).json({
            status: "Success",
            message: "post created successfully"
        })

    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.owner.toString() != req.user._id.toString())
            return res.status(400).json({
                status: "Failed",
                message: "you are not authorised to delete this post"
            })
        await Post.deleteOne(post._id)
        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(post._id)
        user.posts.splice(index, 1)
        await user.save()
        res.status(201).json({
            status: "succesfull",
            message: "Post deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

