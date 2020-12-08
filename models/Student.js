const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    username: String,
    password: String,
    name: String,
    date: {
        type: String,
        default: Date.now()
    },
    events: [{
        type: String
    }]
});

// Model
const Student = mongoose.model('students', StudentSchema);

module.exports = Student;