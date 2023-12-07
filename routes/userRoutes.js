const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`User Id is : ${val}`);
  next();
});

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
