module.exports=(app)=>{
 const get = require('../../controllers/users.crud.controller');
 app.get('/findAll',get.findAll)
 }


