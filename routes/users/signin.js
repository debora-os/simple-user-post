const express = require("express");
const yup = require("yup");
const jwt = require("jsonwebtoken");

const User = require("../../model/user");
const validateRequest = require("../../middlewares/validate-request");

const route = express.Router();

const schema = {
  email: yup.string().email().required(),
  password: yup.string().required(),
};

route.post("/users/signin", [validateRequest(schema)], async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.password !== req.body.password) {
        return res.status(400).send({ message: "invalid credentials" });
      }
    } else {
      return res.status(400).send({ message: "email not found" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "123"
    );
    res.status(200).send({ user: user, token: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = route;
