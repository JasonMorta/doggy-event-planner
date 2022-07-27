module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.delete('/delete',get.deleteEvent)
 
 }

