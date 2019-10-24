import { Router } from 'express';

const routes = new Router();
var request = require('request')

function verifyUserStatus(req,res,next){

  var url = 'http://localhost:5001//auth/status'; //Configure environment variable

  //set header
  var headers = {
      'Authorization': 'token'
  };
  
  request({headers: headers, url: url, method: 'GET'}, function (error, response, body) {
    console.error('error:', error); 
    console.log('statusCode:', response && response.statusCode); 
    console.log('body:', body); 
  });

  next();
}

//Protected route
routes.get('/', verifyUserStatus, (req, res) => {
  


  res.send('Hello World :D');
});


//Unprotected route
routes.get('/', (req, res) => {
  


  res.send('Hello World :D');
});




export default routes;
