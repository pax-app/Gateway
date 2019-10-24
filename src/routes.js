import { Router } from 'express';

const routes = new Router();
var request = require('request')

function verifyUserStatus(req,res,next){

  if(!req.header('Authorization')){
    res.json({"Error":"Missing authorization token"});
  }
  else{
  var url = 'http://pax-user.herokuapp.com/auth/status'; //Configure environment variable for user service

  //set header
  var headers = {
      'Authorization': String(req.header('Authorization'))
  };
  
  request({headers: headers, url: url, method: 'GET'}, function (error, response, body) {
     
    if(JSON.parse(body)['message']!='success'){
      res.sendStatus(403);
    }
    next(); 

  });
}
}

//Protected route
routes.get('/lel', verifyUserStatus, (req, res) => {
  
  res.send('Good');
});


//Unprotected route
routes.get('/', (req, res) => {
  


  res.send('Hello World :D');
});




export default routes;
