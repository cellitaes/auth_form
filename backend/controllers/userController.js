const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");

const TEMP_USERS = [];

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, surname, email, password, birthdate, gender } = req.body;

  let existingUser = TEMP_USERS.find(
    ({ email: storedEmail }) => storedEmail === email
  );

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = {
    name,
    surname,
    email,
    image: req.file.path,
    password,
    birthdate,
    gender,
  };

  TEMP_USERS.push(createdUser);

  res.status(201).json({ createdUser });
};

exports.signup = signup;
