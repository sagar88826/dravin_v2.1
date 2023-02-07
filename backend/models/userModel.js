const mongoose = require("mongoose")
const validator = require("validator")
require("dotenv").config({ path: "../.env" })


const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 8
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User