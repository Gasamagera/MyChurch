const express = require("express");
const memberController = require("./../controllers/memberController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.route("/urgent-member").get(memberController.getMembersByFilters);

router
  .route("/")
  .get(memberController.getAllMembers)
  .post(memberController.createMember);
router
  .route("/:id")
  .get(memberController.getMember)
  .patch(memberController.updateMember)
  .delete(memberController.deleteMember);
module.exports = router;
