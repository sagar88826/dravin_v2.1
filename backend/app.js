const express = require('express')

const router = require("./routes/userRoutes")

const app = express()

app.use(express.json())
// app.use((req, res, next) => {
//     console.log(req.headers)
//     next()
// })
app.use("/user", router)

module.exports = app