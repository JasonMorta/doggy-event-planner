module.exports=(app)=>{
 const get = require('../../controllers/event.crud.controller');
 app.put('/incLike',get.updateLikes)
 }