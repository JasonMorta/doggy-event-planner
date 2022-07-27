module.exports=(app)=>{
 const get = require('../../controllers/users.crud.controller');
 app.post('/logIn',get.logIn)
 
 }