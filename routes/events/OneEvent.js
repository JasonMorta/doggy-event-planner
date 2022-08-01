
module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.post('/OneEvent',get.fetchOne)
 }




