const express = require('express');

const morgan = require('morgan');
const AppError = require('./utils/appError');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorController = require('./controllers/errorController');

// 1 Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware ! ✋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().getTime();
  next();
});

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Learn Xpress' });
});

// Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Handle unhandle route
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   requestedAt: req.requestTime,
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  //Before create class AppError
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  //Using class AppError
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
