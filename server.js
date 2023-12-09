// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

//Connect to the cloud
// const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

// mongoose.connect(DB).then(
//   (con) => {
//     console.log(con.connections);
//     console.log('Success connected!');
//   },
//   (err) => {
//     console.log(`Failed to connect database ${err}`);
//   },
// );

//Connect to the local
mongoose.connect(process.env.DB_LOCAL).then(
  (con) => {
    console.log(con.connections);
    console.log('Success connected!');
  },
  (err) => {
    console.log(`Failed to connect database ${err}`);
  },
);

//Create Schema using mongoose
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is mandatory'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is mandatory'],
  },
  rating: {
    type: Number,
    default: 4.0,
  },
});

//Create model, standart Model must be PascalCase
const Tour = mongoose.model('Tour', tourSchema);

//(sample) Save Document into collections MongoDB
const testTour = new Tour({
  name: 'The real tour you will forgotten',
  duration: 4,
  difficulty: 'medium',
  rating: 4.9,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error while save document 🧨 :', err);
  });

// console.log(app.get("env"));
// console.log(process.env);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`);
});
