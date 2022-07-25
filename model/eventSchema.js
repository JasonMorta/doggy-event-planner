const mongoose = require('mongoose');

const eventSchema={
  heading:  String, // String is shorthand for {type: String}
  shortDes: String,
  time: String,
  day: String,
  location: String,
  mapLink: String,
  dogSize: [String],
  likes: Number
};

module.exports = MongooseModel = mongoose.model('events', eventSchema);

