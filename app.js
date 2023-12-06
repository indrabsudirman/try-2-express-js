const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).json(
    { message: "Hello from the server side!", app: 'Learn Xpress' });
});

app.post('/', (req, res) => {
  res.status(200).send("You can Post with this endpoint ...");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`);
});
