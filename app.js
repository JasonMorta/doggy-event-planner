const express = require("express");
require('isomorphic-fetch');
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: false
}))
require('dotenv').config()
app.use(bodyParser.json())

//require routes to endpoints
//Users
require('./routes/users/newDog')(app);
require('./routes/users/removeDog')(app);
require('./routes/users/updateDog')(app);

//events
require('./routes/events/allEvents')(app);
require('./routes/events/newEvent')(app);
require('./routes/events/updateEvent')(app);
require('./routes/events/incLikes')(app);
require('./routes/events/decLikes')(app);
require('./routes/events/deleteEvent')(app);
require('./routes/events/OneEvent')(app);

//comments
require('./routes/comments/addComment')(app);
require('./routes/comments/removeComment')(app);
require('./routes/comments/updateComment')(app);
require('./routes/comments/findAllComments')(app);
require('./routes/comments/findOneComment')(app);



//store API-key in
const uri = process.env.DB_API_KEY;

//Connect to DB
mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   //useMongoClient: true,
   
});
//connection error handling
mongoose.connection.on('error', function() {
   console.log('Could not connect to the database. Exiting now...');
   process.exit();
   });
mongoose.connection.once('open', function() {
      console.log("Successfully connected to the database");
   })


//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});