const express = require("express");
const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require("./../controllers/tourController");
const router = express.Router();

//Middleware untuk route "id"
router.param("id", checkID);

//Perlu buat juga, multiple middleware, tujuannya, sebelum ke handler Post createTour,
//ada pengecekan dulu, data yg mau dikirim sudah ada value dari model yg required
//Kayak name Tour, difficulty, duration

//Create a checkbody middleware
//Check if body contains the name and price property
//If not, send back 400 (bad request)
//Add it to the post handler stack

router.route("/").get(getTours).post(checkBody, createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
