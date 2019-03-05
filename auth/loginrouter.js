var express = require('express')
var router = express.Router();
let jwt = require('jsonwebtoken');
const config = require('../config');
let TokenBlackList = require('../models/token');
let User = require('../models/user');

//base route is : '/login'

let checkIsClientLoggedInAlready = async function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (token) { //if client has a token in the header we pull it out
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
  
      jwt.verify(token, config.secret, (err, decodedToken) => {
        if( !err){ //van ervenyes tokenje amirol nem tudjuk h feketelistas e
          TokenBlackList.findOne({token: token}).then(function(resultToken){
            if (resultToken != null){ //feketelistas az adott token,vagyis mar kilepett, belephet ujra
              console.log('Feketelistas tokent kuldott bejelentkezesnel');
              next();
            }else{  //van egy ervnyes tokenje ami nem volt rajta a feketelistan, nem lephet be ujra
              res.json({
                success:false,
                message:'Login was not successful, you already have a valid token!'
              });
            }
          }).catch(function(err){ //nem volt feketelistas az adott token, van ervenyes tokenje, nem lephet be ujra
            res.json({
              success:false,
              message:'Login was not successful, you already have a valid token!'
            });
          });
        } else { //nem volt valid a token
          console.log("NEm volt valid a token")
          next();
        }
      });
    } else { //nem volt tokenje
      console.log('Nem volt token');
      next();
    }
  };
  
  let verifyCredentialsAndSendToken = function(req,res,next) {
    
          let username = req.body.username;
          let password = req.body.password;
          console.log('username: '+ username + ' password: '+ password);
          //TODO bcrypt password!
          if (username && password){
            User.findOne({username:username, password: password}).then(resultUser=>{
              console.log('resultUser: '+resultUser);
              if(resultUser != null){
                let token = jwt.sign(
                  {username: username},
                  config.secret,
                  { expiresIn: '60s' }
                );
                res.json({
                  success: true,
                  message: 'Authentication successful!',
                  token: token
                });
              } else {
                res.status(403).json({
                  success: false,
                  message: 'Incorrect username or password'
                });
              }
            }).catch( err =>{
              res.status(400).json({
                success: false,
                message: 'Authentication failed due to some error when querying the database, try again later!'
              });
            });
          } else{
            res.status(400).json({
              success: false,
              message: 'Authentication failed! Please check the request and supply username and password'
            });
          }
    };
  
  
  
  router.post('/',checkIsClientLoggedInAlready, verifyCredentialsAndSendToken);


  module.exports = router;