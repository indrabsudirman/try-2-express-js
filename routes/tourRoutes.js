const express = require("express");
const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
} = require("./../controllers/tourController");
const router = express.Router();

router.param("id", checkID);

router.route("/").get(getTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
