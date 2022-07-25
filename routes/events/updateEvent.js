module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.put('/updateEvent',get.updateEvent)//Sig-up with new account
 
 }

