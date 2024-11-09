const express = require("express");
const countryController = require("./../controllers/countryController");
const router = express.Router();

router
  .route("/")
  .get(countryController.getAllCoutries)
  .post(countryController.createCountry);

router
  .route("/:id")
  .patch(countryController.updateCountry)
  .delete(countryController.deleteCountry);

module.exports = router;
