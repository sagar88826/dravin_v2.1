const express = require('express')

const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/user", userRouter)
app.use("/user", postRouter)

module.exports = app