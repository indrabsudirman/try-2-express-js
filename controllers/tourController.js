const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.difficulty) {
    return res.status(400).json({
      requestedAt: req.requestTime,
      status: 'fail',
      message: 'Missing name, difficulty object',
    });
  }
  next();
};

exports.getTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  console.log(typeof id);

  const tour = tours.find((el) => el.id === id);
  console.log(tour);

  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        requestedAt: req.requestTime,
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    requestedAt: req.requestTime,
    status: 'success',
    data: null,
  });
};
