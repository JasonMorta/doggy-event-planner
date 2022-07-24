module.exports=(app)=>{
  const get = require('../controllers/event.crud.controller');
  app.post('/newEvent',get.new)//Sig-up with new account
  
  }




