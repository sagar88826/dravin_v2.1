const Post = require("../models/postModel")
const User = require('../models/userModel')
const cloudinary = require("cloudinary")
exports.createPost = async (req, res) => {

    try {
        let results
        if (req.files)
            results = await cloudinary.uploader.upload(req.files.postImage.tempFilePath, (err, result) => {
                result ? console.log(result) : console.log(err)
            })
        console.log(req.body)
        let newPost
        if (results) {
            newPost = {
                caption: req.body.caption,
                image: {
                    public_id: results.public_id,
                    url: results.url
                },
                owner: req.user._id
            }
        } else {
            newPost = {
                caption: req.body.caption,
                owner: req.user._id
            }
        }
        const post = await Post.create(newPost)
        const user = await User.findById(req.user._id)

        user.posts.unshift(post._id)

        await user.save()

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


exports.likeDislike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.includes(req.user._id)) {
            post.likes.splice(post.likes.indexOf(req.user._id), 1)
            await post.save()
            res.status(200).json({
                message: "Post disliked"
            })
        } else {
            post.likes.push(req.user._id)
            post.save()
            res.status(200).json({
                message: "Post liked"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}

exports.comments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const commentBody = req.body
        Object.assign(commentBody, { user: req.user._id })
        post.comments.push(commentBody)
        await post.save()
        res.status(200).json({
            message: "comment posted successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.followeePost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const id = user.following.map(el => el.id)
        const post = await Post.find({ owner: { $in: id } }).populate("owner likes comments.user")
        res.status(200).json({
            message: "fetched",
            post
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.myPost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const postId = user.posts.map(el => el._id)
        const post = await Post.find({ _id: { $in: postId } }).populate("owner likes comments.user")
        res.status(200).json({
            message: "fetched",
            post
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}