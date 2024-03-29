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
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

// app.use(express.static(path.join(__dirname, "../frontend/build")))
// app.get("*", (req, res) => {
//     console.log("this is triggered")
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
// })

app.use("/user", userRouter)
app.use("/user", postRouter)

module.exports = app