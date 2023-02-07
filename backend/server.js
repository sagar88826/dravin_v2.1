const express = require('express')
const app = express()
const port = 8000
const mongoose = require("mongoose")
require("dotenv").config({ path: "../.env" })

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected succfull to DB")
}).catch((err) => {
    console.log(er)
})

const newSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cpassword: String
})

const Dravin = mongoose.model("Dravin", newSchema)

app.get('/', (req, res) => {
    res.send("hello from server")
}
)
app.use(express.json())
app.post('/register', (req, res) => {
    const { username, email, password, cpassword } = req.body
    Dravin({ username, email, password, cpassword })
        .save().then((doc) => {
            console.log(doc)
        }).catch((err) => {
            console.log(err)
        })
    res.send("Successfully posted")
})

app.listen(port, () => console.log(`server app listening on port ${port}!`))