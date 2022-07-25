const model = require('../model/eventSchema'); //require the schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

//FIND all Events
exports.all = async (req, res)=>{

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
            heading: req.body.heading,
            shortDes: req.body.shortDes,
            time: req.body.time,
            day: req.body.day,
            location: req.body.location,
            mapLink: req.body.mapLink,
            dogSize: req.body.dogSize,
            likes: 0
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
            await model.findOneAndDelete({heading: req.body.heading});
            const all =  await model.find({});
            res.send(all);

      } catch(err) {
            console.log(err)
            res.send(err)
      }              
}

//UPDATE one event in db
exports.updateEvent =  async (req, res) => {

      try {
            //Find event by id
            await model.findOneAndUpdate({
                        _id: req.body.id
                  },
                  {
                        $set: {     
                              heading: req.body.heading,
                              shortDes: req.body.shortDes,
                              time: req.body.time,
                              date: req.body.date,
                              location: req.body.location,
                              mapLink: req.body.mapLink,
                              dogSize: req.body.dogSize 
                        } 
            },
            { new: true })
            
            //return all event documents
            const events = await model.find({});
            res.json(events) 
      

      } catch(err) {
            console.log(err)
            res.send(err)
      }              
}

//Return all events

//Return event by id events
exports.fetchOne =  async (req, res) => {
      try{
            //return all event documents
            const event = await model.findById({_id: req.body.id});
            res.json(event) 
      } catch(err){
            console.log(err)
            res.send(err)
      }
}
