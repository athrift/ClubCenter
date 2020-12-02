// import npm packages

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

// Routes
const routes = require('./routes/api');

// MongoDb Cloud Atlas Database
// user: isha password: cs348-clubcenter
// Connecting to the MongoDb CLuster
// mongodb+srv://isha:<password>@clubcenter.277rg.mongodb.net/<dbname>?retryWrites=true&w=majority

// Currently using the user 'isha' and the password 'cs348-clubcenter'
const MONGODB_URI = 'mongodb+srv://isha:cs348-clubcenter@clubcenter.277rg.mongodb.net/<dbname>?retryWrites=true&w=majority'

// DB Config
// const MONGODB_URI = require("./config/keys").mongoURI;

// Connecting to the MongoDb database
mongoose.connect(MONGODB_URI || 'mongodb://localhost/ClubCenter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


app.use(cors())
// HTTP Request Logger
app.use(morgan('tiny'));

// Routes
app.use('/api', routes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));
