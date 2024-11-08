const express = require("express");
const memberController = require("./../controllers/memberController");
const authController = require("./../controllers/authController");
const { route } = require("./adminRoutes");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, memberController.getAllMembers)
  .post(memberController.createMember);
router
  .route("/:id")
  .patch(memberController.updateMember)
  .delete(authController.protect, memberController.deleteMember);
module.exports = router;
