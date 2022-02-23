const mongoose = require("mongoose");

const {Schema} = mongoose;

const postSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, required: true},
    description: {type: String, required: true},
    likes: {type: Number, required: true},
    date: {type: Date, required: true}
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;