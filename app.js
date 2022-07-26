const express = require("express");
require('isomorphic-fetch');
const app = express();
const path = require('path')
app.use(express.json());
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
require('dotenv').config()
app.use(bodyParser.json())
//const helmet = require("helmet");

//app.use(helmet());

//Require routes to endpoints
//Users Routes
require('./routes/users/findAll')(app);
require('./routes/users/newDog')(app);
require('./routes/users/removeDog')(app);
require('./routes/users/logInUser')(app);

//events Routes
require('./routes/events/allEvents')(app);
require('./routes/events/newEvent')(app);
require('./routes/events/updateEvent')(app);
require('./routes/events/incLikes')(app);
require('./routes/events/decLikes')(app);
require('./routes/events/deleteEvent')(app);

//comments Routes
require('./routes/comments/addComment')(app);
require('./routes/comments/replies')(app);
require('./routes/comments/removeComment')(app);
require('./routes/comments/findAllComments')(app);
require('./routes/comments/findOneComment')(app);

//store API-key in
const uri = process.env.DB_API_KEY;


//Connect to DB
function connect(){
      mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useMongoClient: true,
   });
}
connect()

//connection error handling
//disconnect from db
   mongoose.connection
      .once('open', () => console.log('Connected!'))
      .on('error', (error) => {
         console.warn('Error : ', error);
      });

//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});


/* For Heroku Deployment */
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, 'frontend/build')));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,
         'frontend', 'build', 'index.html'));
   });
}
