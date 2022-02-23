const express = require("express");
const yup = require("yup");

const Post = require("../../model/post");

const authRequest = require("../../middlewares/auth-request");

const route = express.Router();

route.get("/post/like/filter", [authRequest], async (req, res) => {
  try {
    const posts = await Post.find({
        $and: [
          { date: { $gt: new Date(req.query.startDate) } },
          { date: { $lt: new Date(req.query.endDate) } },
          { likes: { $gt: req.query.minLikes } },
          { likes: { $lt: req.query.maxLikes } },
        ],
        from: req.user.id,
        ...req.query,
      })
      .populate(["userId"]);
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = route;