const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const { promisify } = require("util")

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES_IN}` })
}

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = generateToken(newUser._id)
        res.status(201).json({
            status: "successfully registered",
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "User already exists",
            err
        })
    }
}

exports.login = async (req, res) => {
    // 1 check if password and email given or not
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password)
        return res.status(401).json({
            status: "Please enter email or password"
        })
    // 2 verify email and password
    const user = await User.findOne({ email }).select("+password")
    console.log(user)
    if (!user || !(await user.correctPassword(password, user.password)))
        return res.status(401).json({
            status: "email or password is incorrect"
        })
    let token = await generateToken(user._id)
    res.status(200).cookie("token", token).json({
        status: "Logged In successfully",
        token,
        name: user.username
    })
}

exports.protect = async (req, res, next) => {
    let token
    // 1. check token if it is there or not
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1]
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
    next()
}