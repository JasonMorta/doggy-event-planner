

const model = require('../model/dogOwnerSchema.js'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

//verify JWT token when make a delete/put/update request
// function verifyJwt(decoded, token){
//       const usr = req.headers['authorization'] //Get token from localStorage/frontend
//       const token = usr.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.SECRET_KEY); //verify token secret-key
      //}


//ADD a dogOwner document to db
exports.new = async (req, res) => {

      //handle runtime errors
      try {
             //define the newOwner. This will also include the other schema tags.
            const newOwner = new model({
                  name: req.query.name,
                  password: req.query.password,
            });

            //save the new user to db
            await newOwner.save();

            //return all document
            const all = await model.find({ name: req.query.name,});
            res.json(all)

            //res.send(dogOwner); //send the same data back 
            console.log("New user Added");

      } catch (err) {
            console.log(err)
            res.send(err)
      }  
}

//DELETE a dogOwner from db
exports.delete =  async (req, res) => {

      try{
            //finds the first document that matches the query
            await model.findOneAndDelete({name: req.query.name}, async (err, data)=>{
                  if (data == null) {
                  
                        console.log("no data found")
                  
                  } else {
                        console.lof("Deleted")
                        const all = await model.find({});
                        res.send(all)
                  }
            });
                  
            

      } catch(err) {
            console.log(err)
            res.send(err)
      }              
}



//UPDATE Owner
exports.update =  async (req, res) => {

            let dog = req.query.name
      try{
            //Find owner by id
            await model.findOneAndUpdate({name: dog},
            {
                  $set: { comments: "req query commentsww" } 
            },
                  { new: true })
                 
            //return owner documents
            const dogOwner = await model.find(req.query.dog);
            res.send(dogOwner) 
           

       }catch(err) {
            console.log(err)
            res.send(err)
      }              
}


