module.exports=(app)=>{
 const get = require('../../controllers/comments.crud.controller');
 app.put('/updateComment',get.updateComment)
 
 }

