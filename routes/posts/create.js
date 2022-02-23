const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");
const validateRequest = require("../../middlewares/validate-request");

const schema = {
  description: yup.string().required(),
};

const route = express.Router();

route.post(
  "/post",
  [authRequest, validateRequest(schema)],
  async (req, res) => {
    try {
      const newPost = await Post.create({
        userId: req.user.id,
        description: req.body.description,
        date: new Date(),
        likes: 0,
      });
      res.status(201).send(newPost);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
);

module.exports = route;
