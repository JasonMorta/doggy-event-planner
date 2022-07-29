const model = require('../model/dogOwnerSchema.js'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

//verify JWT token when make a delete/put/update request
// function verifyJwt(decoded, token){
//       const usr = req.headers['authorization'] //Get token from localStorage/frontend
//       const token = usr.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.SECRET_KEY); //verify token secret-key
//}



//FIND all owners
exports.findAll = async (req, res) => {

      try {
            const owners = await model.find({});
            res.send(owners)
      } catch {
            console.log(err)
            res.send(err)
      }
}

//FIND One/LOG-IN owner
//Generate a new token on log-in
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

//ADD(SIGN-UP) a dogOwner document to db
exports.new = async (req, res) => {

      //First check is userName exists
      let name = req.body.name
      let password = req.body.password

      //handle runtime errors
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
                        name: name
                  });
                  res.send(user)

                  //res.send(dogOwner); //send the same data back 
                  console.log("New user Added");
            }

      } catch (err) {
            console.log(err)
            res.send(err)
      }
}

//DELETE a dogOwner from db
exports.delete = async (req, res) => {

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



//UPDATE Owner
exports.update = async (req, res) => {

      let dog = req.body.name
      try {
            //Find owner by id
            await model.findOneAndUpdate({
                  name: dog
            }, {
                  $set: {
                        comments: "req query commentsww"
                  }
            }, {
                  new: true
            })

            //return owner documents
            const dogOwner = await model.find(req.body.dog);
            res.send(dogOwner)


      } catch (err) {
            console.log(err)
            res.send(err)
      }
}