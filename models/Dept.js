
const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const DeptSchema = new Schema({
    department: String,
    orgName: String
    

});

// Model
const Dept = mongoose.model('department', DeptSchema);

module.exports = Dept;