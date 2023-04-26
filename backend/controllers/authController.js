const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const cloudinary = require("cloudinary")
const { Promise } = require('mongoose')
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
exports.signUp = async (req, res) => {
    let result
    try {
        let owner
        const { email, password, cpassword, username } = req.body
        if (req.files)
            result = await cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
                result ? console.log(result) : console.log(err)
            })
        if (result) {
            owner = await User.create({
                email, password, cpassword, username,
                avatar: { public_id: result.public_id, url: result.url }
            })
        } else {
            owner = await User.create({ email, password, cpassword, username })
        }
        const token = generateToken(owner._id)
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({
            message: "successfully registered",
            owner
        })
    } catch (err) {
        if (result)
            cloudinary.uploader.destroy(result.public_id)
        res.status(400).json({
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        // 1 check if password and email given or not
        const { email, password } = req.body
        if (!email || !password)
            return res.status(401).json({
                status: "Please enter email or password"
            })
        // 2 verify email and password
        const user = await User.findOne({ email }).select("+password")
        if (!user || !(await user.correctPassword(password, user.password)))
            return res.status(401).json({
                status: "email or password is incorrect"
            })
        let token = await generateToken(user._id)
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true

        }
        res.status(200).cookie("token", token, options).json({
            message: "Logged In successfully",
            owner: user
        })
    } catch (err) {
        console.log(err)
        res.status(200).json({
            message: err.message
        })
    }
}

exports.protect = async (req, res, next) => {

    const token = req.cookies.token

    if (!token)
        return res.status(401).send("You are not Logged In, please login to get access")
    // 2. verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3. check if user still exists
    const freshUser = await User.findById(decode.id)
    if (!freshUser) {
        return res.status(401).json({
            status: "User does not longer exists"
        })
    }

    req.user = await User.findById(decode.id)
    next()
}

exports.logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()) }).json({
            message: "Logout successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
