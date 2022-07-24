module.exports=(app)=>{
 const get = require('../controllers/users.crud.controller');
 app.put('/updateEvent',get.update)//Sig-up with new account
 
 }

