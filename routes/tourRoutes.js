const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  console.log(typeof id);

  const tour = tours.find((el) => el.id === id);
  console.log(tour);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tours: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: "<Updated tour here ...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    requestedAt: req.requestTime,
    data: null,
  });
};

const router = express.Router();

router.route("/").get(getTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
