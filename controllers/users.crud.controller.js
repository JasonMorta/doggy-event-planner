const model = require('../model/dogOwnerSchema.js'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()


//! Get all users
//FIND all owners
//get = /allUsers
exports.all = async (req, res) => {

      try {
            const owners = await model.find({});
            res.send(owners)
      } catch {
            console.log("no users found")
            res.send("user not found")
      }
}

//! Log-in owner
//FIND One/ 
//Generate a new token on log-in
// post = /logIn
exports.logIn = async (req, res, next) => {
      //Create the JWT token      
      payload = {
            'name': req.body.name
      }
      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY, {
            algorithm: 'HS256'
      })

      try {
            const user = await model.findOne({
                  name: req.body.name,
                  password: req.body.password
            });
            res.json({
                  'data': user,
                  'token': token
            })
            console.log(token)
      } catch (err) {
            console.log(err)
            res.send(err)
            next()
      }
}

//! Register
//ADD(SIGN-UP) a dogOwner document to db
//send token with response
//post = /newDog
exports.new = async (req, res) => {

   //First check is userName exists
      let name = req.body.name
      let password = req.body.password
  

      //Create the JWT token      
      payload = {'name': name }
      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY, {
            algorithm: 'HS256'
      })

      try {

            const user = await model.findOne({
                  name: name
            })
            if (user) {
                  let exists = "Username taken"
                  console.log("User exists")
                  res.json(exists)
            } else {
                  //define the newOwner. This will also include the other schema tags.
                  const newOwner = new model({
                        name: name,
                        password: password,
                        roll: 'member'
                  });

                  //save the new user to db
                  await newOwner.save();

                  //find return this document
                  const user = await model.findOne({
                        name: req.body.name,
                        password: req.body.password
                  });
                  res.send({
                        'data': user,
                        'token': token
                  })

                  //res.send(dogOwner); //send the same data back 
                  console.log("New user Added");
            }

      } catch (err) {
            console.log(err)
            res.send(err)
      }
}

//! Delete user
//Only admin can do this
//DELETE a dogOwner from db
// put = /removeDog
exports.delete = async (req, res) => {
      console.log('req.body.id', req.body.id)
      try {
            await model.findOneAndDelete({
                  _id: req.body.id
            
            })

            //find & return all owners documents
            const owners = await model.find({});
            res.send(owners);
            console.log("user deleted")

      } catch (err) {
            console.log(err)
            res.send(err)
      }
}