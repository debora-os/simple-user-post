const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.delete("/post/:id", [authRequest], async (req, res) => {
  try {
    const newPost = await Post.findByIdAndRemove(req.params.id);
    res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = route;
