const mongoose = require('mongoose');
const assert = require('assert');

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
    type: String,
    required: true
  }
}

const MongooseModel = mongoose.model("dogOwners", Schema)

module.exports = MongooseModel;
