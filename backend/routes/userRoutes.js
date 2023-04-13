const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.route("/:id").post(authController.protect, userController.follow);
router
  .route("/find-user/:id")
  .post(authController.protect, userController.findUser);
router
  .route("/my-profile")
  .get(authController.protect, userController.myProfile)
  .patch(authController.protect, userController.updateProfile);

router
  .route("/update-password/")
  .patch(authController.protect, userController.updatePassword);
router
  .route("/delete-profile/")
  .delete(authController.protect, userController.deleteProfile);

module.exports = router;
