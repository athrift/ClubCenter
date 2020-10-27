  
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
    }
});

// Model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;