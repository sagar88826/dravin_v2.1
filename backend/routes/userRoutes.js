const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")
const { follow } = require("../controllers/userController")

router.post("/signup", authController.signUp)
router.post("/login", authController.login)
router.route("/:id")
    .post(authController.protect, follow)


module.exports = router