const express = require("express");
const occupationController = require("./../controllers/occupationController");
const router = express.Router();

router
  .route("/")
  .get(occupationController.getAllOccupation)
  .post(occupationController.createOccupation);

router
  .route("/:id")
  .patch(occupationController.updateOccupation)
  .delete(occupationController.deleteOccupation);

module.exports = router;
