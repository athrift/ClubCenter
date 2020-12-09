const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    organization: String,
    headline: String,
    description: String,
    date: {
        type: String,
    },
    time: String,
    place: String,
    numattendees: Number,
    attendees: [{
        type: String
    }]

});

// Model
const Organization = mongoose.model('events', EventSchema);

module.exports = Organization;
