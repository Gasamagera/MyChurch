const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post(
  "/forgotPassword",
  authController.forgetPassword
);
router.patch("/resetPassword/:token", authController.resetPassword);
module.exports = router;
