const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/fileUpload");
const router = express.Router();
const userController = require("../controllers/userController");

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty().isLength({ min: 3 }),
    check("surname").not().isEmpty().isLength({ min: 3 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }).isLength({ max: 24 }),
    check("birthdate").custom((value) => {
      const currentDate = new Date().getTime();
      const chosenDate = new Date(value).getTime();
      if (chosenDate - currentDate > 0) {
        return Promise.reject("Incorrect date");
      }
      return true;
    }),
  ],
  userController.signup
);

module.exports = router;
