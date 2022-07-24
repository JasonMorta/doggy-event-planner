const model = require('../model/eventSchema'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

//FIND all Events
exports.findAll = async (req, res)=>{

      try {
            const events = await  model.find({});
            res.send(events)  
      } catch {
            console.log(err)
            res.send(err)
      }
}

//ADD a event document to db
exports.new = async (req, res) => {

  //"try,catch" will handle runtime errors
      try {
         //define the newOwner. This will also include the other schema tags.
        const newEvent = new model({
            heading: req.query.heading,
            shortDes: req.query.shortDes,
            time: req.query.time,
            date: req.query.date,
            location: req.query.location,
            dogSize: req.query.dogSize,
        });

        //save the new user to db
        await newEvent.save();

        //return all event documents
        const all = await model.find({});
        res.json(all)

        //res.send(dogOwner); //send the same data back 
        console.log("New Event Added");

      } catch(err) {
        console.log(err)
        res.send(err)
  }  
}



//DELETE one event from the db
exports.delete =  async (req, res) => {

      try {
            await model.findOneAndDelete({heading: req.query.heading});
            const all =  await model.find({});
            res.send(all);

      } catch(err) {
            console.log(err)
            res.send(err)
      }              
}

//UPDATE one event in db
exports.update =  async (req, res) => {

     
try {
      //Find owner by id
      await model.findOneAndUpdate({heading: req.query.heading},
      {
            $set: {     heading: req.query.heading,
                        shortDes: req.query.shortDes,
                        time: req.query.time,
                        date: req.query.date,
                        location: req.query.location,
                        dogSize: req.query.dogSize } 
      },
            { new: true })
           
      //return all event documents
      const events = await model.find({});
      res.send(events) 
     

} catch(err) {
      console.log(err)
      res.send(err)
}              
}