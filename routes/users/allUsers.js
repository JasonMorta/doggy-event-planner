module.exports=(app)=>{
 const get = require('../../controllers/users.crud.controller');
 app.get('/allUsers',get.all)
 }

 //user controller route


