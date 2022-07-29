const model = require('../model/commentSchema'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()



//FIND One comment by id
exports.findOneComment = async (req, res)=>{

 try {
       const comment = await  model.find({_id: req.body.id});
       res.send(comment)  
 } catch {
       console.log(err)
       res.send(err)
 }
}

//FIND all comments
exports.findAllComments = async (req, res)=>{

      try {
            const events = await  model.find({}).sort({ "created" : -1});
            res.send(events)  
      } catch {
            console.log(err)
            res.send(err)
      }
     }

//ADD a comment document to db
exports.addComment = async (req, res, next) => {

      const auth  = req.headers['authorization'] //Get token from sessionStorage/frontend
      const token = auth.split(' ')[1]
 //handle runtime errors
 try {
      const verify = jwt.verify(token, process.env.SECRET_KEY); //verify token secret-key
      const newComment = new model({
            user: req.body.user,
            comment: req.body.comment,
      });

      //save the new user to db
      await newComment.save();

      //return all document
      const data = await model.find({}).sort({ "created" : -1});;
      res.send(data)
      console.log("New Comment Added");
      

 } catch (err) {
       console.log(err)
       res.status(401).send({'err': 'Bad JWT!'})
      
 }  
}


//REPLY to a comment
exports.replies =  async (req, res) => {
      
      try {
            //Find event by id
            await model.findOneAndUpdate(
             {_id: req.body.id},

             {$push: {replies: {
                  comment: req.body.comment,
                  user: req.body.user
            }}},
             {new: true, upsert: true });
           

            //return all comment documents
            const events = await model.find({}).sort({ "created" : -1});
            console.log("Comment Updated")
            res.send(events) 
      
     
      } catch(err) {
            console.log(err)
            res.send(err)
      }              
     }


//DELETE one comment from the db
exports.removeComment =  async (req, res) => {

 try {
       await model.findOneAndDelete(
       { _id: req.body.id }
       )

       //find & return all comment documents
       const comments =  await model.find({}).sort({ "created" : -1});
       res.send(comments);
       console.log("Comment delete")

 } catch(err) {
       console.log(err)
       res.send(err)
 }              
}


//UPDATE one comment in db
exports.updateComment =  async (req, res) => {
      
 try {
       //Find event by id
       await model.findOneAndUpdate(
        {_id: req.body.id},
        {$set: {comment: req.body.comment}},
       { new: true })
       
       //return all comment documents
       const events = await model.find({}).sort({ "created" : -1});
       console.log("Comment Updated")
       res.send(events) 
 

 } catch(err) {
       console.log(err)
       res.send(err)
 }              
}