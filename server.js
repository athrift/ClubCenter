// import npm packages

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Connecting to the MongoDb database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ClubCenter', {
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