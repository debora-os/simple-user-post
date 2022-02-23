const express = require("express");
const yup = require("yup");
const jwt = require("jsonwebtoken");

const User = require("../../model/user");
const validateRequest = require("../../middlewares/validate-request");

const route = express.Router();

const schema = {
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  age: yup.number().required(),
};

route.post("/users/signup", [validateRequest(schema)], async (req, res) => {
  const newUser = await User.create(req.body);
  try {
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      "123"
    );
    res.status(200).send({ user: newUser, token: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = route;
