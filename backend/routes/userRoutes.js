const express = require("express")
const router = express.Router()
const { createUser, getUser } = require("../controllers/userController")

router.route("/")
    .post(createUser)
    .get(getUser)

module.exports = router