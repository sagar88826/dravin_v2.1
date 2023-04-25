const express = require('express')

const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const cookieParser = require("cookie-parser")
const fileupload = require("express-fileupload")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(fileupload({
    useTempFiles: true
}))

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.use("/user", userRouter)
app.use("/user", postRouter)

module.exports = app