
const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const OrganizationSchema = new Schema({
    orgUser: String,
    orgPass: String,
    orgName: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;