module.exports=(app)=>{
  const get = require('../controllers/users.crud.controller');
  app.post('/newDog',get.new)//Sig-up with new account
  
  }




