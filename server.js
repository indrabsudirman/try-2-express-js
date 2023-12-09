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
//     console.log(err);
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

// console.log(app.get("env"));
// console.log(process.env);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`);
});
