module.exports=(app)=>{
 const get = require('../controllers/event.crud.controller');
 app.delete('/removeEvent',get.delete)//Sig-up with new account
 
 }

