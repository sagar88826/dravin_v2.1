const User = require('../models/userModel')

exports.createUser = (req, res) => {
    const { username, email, password, cpassword } = req.body
    User({ username, email, password, cpassword })
        .save().then((doc) => {
            console.log(doc)
        }).catch((err) => {
            console.log(err)
        })
    res.send("Successfully posted")
}

exports.getUser = (req, res) => {
    res.send("hello from server")
}