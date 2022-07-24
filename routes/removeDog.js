module.exports=(app)=>{
  const get = require('../controllers/users.crud.controller');
  app.delete('/removeDog',get.delete)//Sig-up with new account
  
  }

