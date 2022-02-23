const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.get("/post/:id", [authRequest], async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(201).send(posts);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = route;