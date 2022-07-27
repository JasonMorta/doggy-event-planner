module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.put('/decLikes',get.decrementLikes)
 }