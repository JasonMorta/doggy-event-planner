module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.put('/updateEvent',get.updateEvent)
 
 }

