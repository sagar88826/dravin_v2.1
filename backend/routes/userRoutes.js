const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")

router.post("/signup", authController.signUp)
router.post("/login", authController.login)

router.route("/")
    .get(authController.protect, userController.getUser)

module.exports = router