const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");
const validateRequest = require("../../middlewares/validate-request");

const schema = {
  description: yup.string().required(),
};

const route = express.Router();

route.put(
  "/post/:id",
  [authRequest, validateRequest(schema)],
  async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        description: req.body.description,
        date: new Date(),
        likes: 0,
      });
      const updatePost = await Post.findById(req.params.id)
      res.status(201).send(updatePost);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
);

module.exports = route;