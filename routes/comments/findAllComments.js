module.exports=(app)=>{
 const get = require('../../controllers/comments.crud.controller');
 app.post('/findAllComments',get.findAllComments)
 
 }

