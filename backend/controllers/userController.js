const User = require('../models/userModel')

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body
        const doc = await User({ username, email, password, cpassword }).save()
        console.log(doc)
        res.send("Successfully posted")
    } catch (err) {
        console.log(err)
        res.status(400).send("bad request")
    }
}


exports.getUser = (req, res) => {
    res.send("hello from server")
}