const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.get("/post/likes/morelikes", [authRequest], async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id });
    let moreLikes = 0;
    let newIndex = 0;

    for (let index = 0; index < posts.length; index++) {
      if (posts.likes > moreLikes) {
        moreLikes = posts.likes;
        newIndex = index;
      }
    }
    res.status(201).send(posts[newIndex]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

module.exports = route;
