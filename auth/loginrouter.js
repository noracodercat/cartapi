var express = require('express')
var router = express.Router();
let jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
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
        if( !err){ //user has a valid token, but we don't know if it is in the Token-BlackList
          TokenBlackList.findOne({token: token}).then(function(resultToken){
            if (resultToken != null){ //the token is in the Blacklist, so user logged out earlier, so he/she can log in now
              next();
            }else{  //user has a valid token, and the blacklist doesn't contain this token, so user is currently logged in, he/she cant log in again
              res.json({
                success:false,
                message:'Login was not successful, you already have a valid token!'
              });
            }
          }).catch(function(err){ 
            res.json({
              success:false,
              message:'Login was not successful!'
            });
          });
        } else { //user has an invalid token
          next();
        }
      });
    } else { //user don't have token
      next();
    }
  };
  
  let verifyCredentialsAndSendToken = function(req,res,next) {
    
          let username = req.body.username;
          let password = req.body.password;
         
          if (username && password){
            User.findOne({username:username}).then(resultUser=>{
              if(resultUser != null){
                bcrypt.compare(password, resultUser.password).then(result =>{
                  if (result ==true){
                    let token = jwt.sign(
                      {username: username},
                      config.secret,
                      { expiresIn: '20 days' }
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
                })

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