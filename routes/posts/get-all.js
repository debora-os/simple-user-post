const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.get("/post", [authRequest], async (req, res) => {
  try {
    const posts = await Post.find().populate(["userId"]);
    res.status(200).send(posts);
  } catch (err) {
      console.log(err)
    res.status(500).send({ message: err });
  }
});

module.exports = route;
