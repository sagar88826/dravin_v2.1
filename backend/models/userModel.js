const mongoose = require("mongoose")
require("dotenv").config({ path: "../.env" })


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cpassword: String
})

const User = mongoose.model("User", userSchema)

module.exports = User