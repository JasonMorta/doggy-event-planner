let model = require('../model/dogOwnerSchema');
let mongoose = require("mongoose");
let chai = require('chai');
let expect = chai.expect;
let request = require('request');


  //Describe the test
  //This Test will only return all the users and comments status codes.
  //Make sure to run the application before starting the test.
   describe('Running fetch request to MongoDB',  ()=> {

    it('Should return all users', (done) => {
     request.get('http://localhost:8080/findAll', (req, response) => {
      expect(response.statusCode).to.equal(200);
      mongoose.disconnect();
      done();
     })
    });

    it('Should return all comments', (done) => {
     request.get('http://localhost:8080/allEvents', (req, response) => {
      expect(response.statusCode).to.equal(200);
      mongoose.disconnect();
      done();
     })
    });

   })
   


  




