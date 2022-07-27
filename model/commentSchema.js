const mongoose = require('mongoose');

const Schema = {
  
  comment: String,
  created   : { 
    type:  Date,
    default: Date.now,
   },
 
}

module.exports = MongooseModel = mongoose.model("comments", Schema)

