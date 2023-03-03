const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const { promisify } = require("util")

<<<<<<< HEAD
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
=======
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES_IN}` })
>>>>>>> 36a294f6e1aa9674255e4870dc3ab9409ba47201
}

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
<<<<<<< HEAD
        let token = generateToken(newUser._id)
=======
        const token = generateToken(newUser._id)
>>>>>>> 36a294f6e1aa9674255e4870dc3ab9409ba47201
        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            err
        })
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
    if (!user || !(await user.correctPassword(password, user.password)))
        return res.status(401).json({
            status: "failed",
            message: "email or password is incorrect"
        })
<<<<<<< HEAD
    let token = generateToken(user._id)
    console.log(token)
    res.status(200).json({
        status: "successfully logged in",
        token
    })

=======
    let token = await generateToken(user._id)
    res.status(200).json({
        status: "success",
        message: "Logged In successfully",
        token
    })
>>>>>>> 36a294f6e1aa9674255e4870dc3ab9409ba47201
}

exports.protect = async (req, res, next) => {
    let token
    // 1. check token if it is there or not
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1]
<<<<<<< HEAD
    }
    // console.log(token)
    if (!token) {
        res.status(401).send("You are not Logged In, please login to get access")
    }

    // 2. verify token
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decoded)
        next()
    } catch (err) {
        res.status(401).json({ err })
    }
=======
    if (!token)
        return res.status(401).send("You are not Logged In, please login to get access")
    // 2. verify token
    try {
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        res.status(401).json({ err })
    }
>>>>>>> 36a294f6e1aa9674255e4870dc3ab9409ba47201
}