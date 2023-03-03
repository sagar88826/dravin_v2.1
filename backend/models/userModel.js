const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
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
        minlength: 8,
        select: false
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Password are not same"
        }
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = undefined
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema)

module.exports = User