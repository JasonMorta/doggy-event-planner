module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.get('/allEvents',get.all)
 }




