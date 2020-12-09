
const mongoose = require('mongoose');

// Creating  a Mongoose Schema
const Schema = mongoose.Schema;
const InterestSchema = new Schema({
    username: String,
    interest:  [{
      type: String
  }]
    

});

// Model
const Interest = mongoose.model('interests', InterestSchema);

module.exports = Interest;