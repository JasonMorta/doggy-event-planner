module.exports=(app)=>{
 const get = require('../../controllers/comments.crud.controller');
 app.put('/replies',get.replies)
 
 }

