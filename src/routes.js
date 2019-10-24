import { Router } from 'express';

const routes = new Router();
var request = require('request')

function userAuthentication(req,res,next){

  //Checking for the presence of an Authorization header
  if(!req.header('Authorization')){
    res.json({"Error":"Missing authorization token"});
  }
  
  //User service URL at get user status route
  var url = 'http://pax-user.herokuapp.com/auth/status';
  
  //Set header with authorization token received
  var headers = {
      'Authorization': String(req.header('Authorization'))
  };
  
  request({headers: headers, url: url, method: 'GET'},  (error, response, body) => {
    
    if(error){
      res.send(error)
    }
    
    //If received response is not success, then send forbidden status
    if(JSON.parse(body)['message']!='success'){
      res.sendStatus(403);
    }
    
    //Else means authorized request, go to next step of the chain
    next(); 

  });

}


//Unprotected route, no authentication step
routes.get('/provider_by_category', (req, res) => {
  
  //Passing category id to URL
  var url = "http://pax-user.herokuapp.com/provider_by_category/"+req.query.id
  
  //GET Request to User service
  request({url: url, method: 'GET'}, (error, response, body) => {
      
      if(error){
        res.send(error)
      }
    
      res.json(JSON.parse(body))
  });

});


export default routes;
