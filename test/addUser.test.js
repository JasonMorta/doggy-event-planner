

const model = require('../model/dogOwnerSchema');
const mongoose = require("mongoose");
const assert = require('chai').assert

//Create a document for testing
const uri = "mongodb+srv://mortadev:b3BBtgnspbBt9z44@cluster01.j0haa.mongodb.net/test_db?retryWrites=true&w=majority"
//Connect to DB
mongoose.connect(uri);


  //Describe the test
  describe('Running test to add new user to DB',  ()=> {
    //Create Test
    //Add a new user to the 'test_db' database
    it('OK, new user created',  () => {

        const newOwner = new model({
          name: 'Test run',
          password: '123',
          roll: 'member'
        });

        newOwner.save()
        
        .then((res) => {
          const body = res;
          assert.typeOf(body, 'object');
          
        })
        
      
        
        
     })
      

       
    });

  




