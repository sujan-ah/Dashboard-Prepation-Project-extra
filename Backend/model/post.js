const mongoose = require('mongoose');
const {Schema} = mongoose

const postSchema = Schema({
    activity: String,
    hour: String,
    details: String,
    user: String,
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post