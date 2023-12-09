// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

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
// const testTour = new Tour({
//   name: 'The real tour you will forgotten',
//   duration: 4,
//   difficulty: 'medium',
//   rating: 4.9,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error while save document 🧨 :', err);
//   });

module.exports = Tour;
