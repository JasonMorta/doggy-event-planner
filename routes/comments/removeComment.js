module.exports=(app)=>{
 const get = require('../../controllers/comments.crud.controller');
 app.delete('/removeComment',get.removeComment)
 
 }

