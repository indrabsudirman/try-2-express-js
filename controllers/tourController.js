// const fs = require('fs');
const Tour = require('../models/tourModel');

//Testing read from JSON file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// Check id no need anymore, just to show how middleware work
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is : ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       requestedAt: req.requestTime,
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

//No need middleware to check body, because mongoose take care about that process
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.difficulty) {
//     return res.status(400).json({
//       requestedAt: req.requestTime,
//       status: 'fail',
//       message: 'Missing name, difficulty object',
//     });
//   }
//   next();
// };
exports.checkBody = (req, res, next) => {
  if (typeof req.body.duration !== 'number') {
    return res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: 'Duration must be number',
    });
  }
  next();
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      requestedAt: req.requestTime,
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: `Error get all data ${err}`,
    });
  }
};

exports.getTour = async (req, res) => {
  console.log(req.params.id);

  // const id = req.params.id * 1;
  // console.log(typeof id);

  // const tour = tours.find((el) => el.id === id);
  // console.log(tour);

  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      requestedAt: req.requestTime,
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: `Error get data ${err}`,
    });
  }
};

exports.createTour = async (req, res) => {
  console.log(req.body);

  try {
    // const newId = tours[tours.length - 1].id + 1;
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    // const newTour = { id: newId, ...req.body };

    //No need this style, will use Model.create and using async await
    // const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      requestedAt: req.requestTime,
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: `Error while save new data ${err}`,
    });
  }
};

exports.updateTour = async (req, res) => {
  console.log(req.params.id);
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      requestedAt: req.requestTime,
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: `Error while update data ${err}`,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      requestedAt: req.requestTime,
      status: 'success',
      message: 'success',
    });
  } catch (err) {
    res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: `Error while delete data ${err}`,
    });
  }
};
