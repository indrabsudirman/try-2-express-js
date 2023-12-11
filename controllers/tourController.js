// const fs = require('fs');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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

exports.getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  console.log(req.params.id);

  // const id = req.params.id * 1;
  // console.log(typeof id);

  // const tour = tours.find((el) => el.id === id);
  // console.log(tour);

  const tour = await Tour.findById(req.params.id);

  if (!tour) return next(new AppError('No Tour found with that Id', 404));

  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  console.log(req.body);

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
});

exports.updateTour = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) return next(new AppError('No Tour found with that Id', 404));

  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppError('No Tour found with that Id', 404));

  res.status(204).json({
    requestedAt: req.requestTime,
    status: 'success',
    message: 'success',
  });
});
