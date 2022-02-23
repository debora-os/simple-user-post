const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.post("/post/deslike/:id", [authRequest], async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    posts.likes -= 1
    await Post.findByIdAndUpdate(req.params.id, {likes: posts.likes})
    const postsUpdated = await Post.findById(req.params.id);
    res.status(201).send(postsUpdated);
  } catch (err){
    res.status(500).send({ message: err });
  }
});

module.exports = route;