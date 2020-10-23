const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    username: String,
    password: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;