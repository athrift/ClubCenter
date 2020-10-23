// import npm packages

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// MongoDb Cloud Atlas Database
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

// Only using the local mongoose database
// Connecting to the MongoDb database
// mongoose.connect('mongodb://localhost/ClubCenter', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Adding data to the database
data = {
    username: 'demo_user',
    password: 'demo_pass'
}

// Creating a new instance of the model and passing in the dummy data
// const newBlogPost = new BlogPost(data);
// newBlogPost.save((error) => {
//     if (error) {
//         console.log('There was an error in saving the data.');
//     } else {
//         console.log('Data has been saved.');
//     }
// });

//module.exports = BlogPost;

app.use(cors())
// HTTP Request Logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));