const mongoose = require('mongoose');

const Schema = {
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  comments: [{
    type: String,
    date: Date
  }],
  created: {
    type: Date,
    default: Date.now
  },
  roll: {
    type: String
  }
}

module.exports = MongooseModel = mongoose.model("dogOwners", Schema)