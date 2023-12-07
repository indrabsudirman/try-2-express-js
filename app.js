const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// 1 Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware ! ✋🏻");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().getTime();
  next();
});

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side!", app: "Learn Xpress" });
});

// Router

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
