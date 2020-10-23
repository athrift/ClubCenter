// import npm packages

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDb Database
// user: isha password: cs348-clubcenter
// Connecting to the MongoDb CLuster
// mongodb+srv://isha:<password>@clubcenter.277rg.mongodb.net/<dbname>?retryWrites=true&w=majority

// Currently using the user 'isha' and the password 'cs348-clubcenter'
const MONGODB_URI = 'mongodb+srv://isha:cs348-clubcenter@clubcenter.277rg.mongodb.net/<dbname>?retryWrites=true&w=majority'
// Connecting to the MongoDb database
mongoose.connect(MONGODB_URI || 'mongodb://localhost/ClubCenter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Verufying the connection to the database using a listener
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

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

// Adding data to the database
data = {
    username: 'demo_user',
    password: 'demo_pass'
}

// Creating a new instance of the model and passing in the data
// const newBlogPost = new BlogPost(data);
// newBlogPost.save((error) => {
//     if (error) {
//         console.log('There was an error in saving the data.');
//     } else {
//         console.log('Data has been saved.');
//     }
// });

//module.exports = BlogPost;

// HTTP Request Logger
app.use(morgan('tiny'));

// Setting up Demo Routes 
app.get('/api', (req, res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));