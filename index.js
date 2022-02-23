const express = require("express");
const mongoose = require("mongoose");

const signup = require("./routes/users/signup");
const signin = require("./routes/users/signin");

const createPost = require("./routes/posts/create");
const deletePost = require("./routes/posts/delete");
const updatePost = require("./routes/posts/update");
const getAll = require("./routes/posts/get-all");
const getById = require("./routes/posts/get-by-id");
const like = require("./routes/posts/like");
const deslike = require("./routes/posts/deslike");
const getMoreLikes = require("./routes/posts/get-more-like");
const filterPosts = require("./routes/posts/filter");

mongoose.connect("mongodb://localhost:27017/posts");

const server = express();
server.use(express.json());

server.use(signup);
server.use(signin);

server.use(getMoreLikes);
server.use(createPost);
server.use(deletePost);
server.use(updatePost);
server.use(getAll);
server.use(getById);
server.use(like);
server.use(deslike);
server.use(filterPosts);

server.listen(3000, () => {
  console.log("LISTEN IN PORT 3000!!!");
});
