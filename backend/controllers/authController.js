const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).send("bad request")
    }
}

exports.login = async (req, res) => {
    // 1 check if password and email given or not
    const { email, password } = req.body
    if (!email || !password)
        return res.status(401).json({
            status: "failed",
            message: "Please enter email or password"
        })
    // 2 verify email and password
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(user.correctPassword(password, user.password)))
        res.status(401).json({
            status: "failed",
            message: "Please provide valid email or password"
        })

}

exports.protect = (req, res, next) => {
    let token
    // 1. check token if it is there or not
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        return next()
    }
    console.log(token)
    if (!token) {
        res.status(401).send("You are not Logged In, please login to get access")
    }

}