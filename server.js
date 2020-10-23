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


// HTTP Request Logger
app.use(morgan('tiny'));

// Setting up Demo Routes 
app.get('/api', (req, res) => {
    const data = {
        username: 'isha',
        password: 'cs348'
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));