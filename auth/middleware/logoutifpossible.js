let jwt = require('jsonwebtoken');
const config = require('../../config');
let TokenBlackList = require('../../models/token');

let logoutIfClientHasBeenSignedIn = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (token) { 
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
  
      jwt.verify(token, config.secret, (err, decodedToken) => {
        if (!err) { //if the user has a valid token, then we add this token to the blacklist
          TokenBlackList.create({token: token, expireAt: new Date(decodedToken.exp * 1000)}, function(err,newDocument){
            if (err){
              res.json({
                success: false,
                message: 'Logout cannot be done, token is not valid!'
              });
            } else {
              res.json({
                success: true,
                message: 'Logout succesful!'
              });
            }
          });
        } else { //user has invalid token
          res.json({
            success: true,
            message: 'Logout cannot be done, you have not been signed in!'
          });
        }
      });
    } else { //user doesn't have token 
      res.json({
        success: true,
        message: 'Logout cannot be done, you have not been signed in!'
      });
    }
  }

  module.exports =logoutIfClientHasBeenSignedIn;