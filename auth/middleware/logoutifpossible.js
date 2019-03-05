let jwt = require('jsonwebtoken');
const config = require('../../config');
let TokenBlackList = require('../../models/token');

let logoutIfClientHasBeenSignedIn = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (token) { //if client has a token in the header we pull it out
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
  
      jwt.verify(token, config.secret, (err, decodedToken) => {
        if (!err) { //ha volt tokenje amit mi adtunk ki es ervenyes akkor azt berakjuk feketelistara
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
        } else { //volt tokenje de nem volt érvényes
          res.json({
            success: true,
            message: 'Logout cannot be done, you have not been signed in!'
          });
        }
      });
    } else { //tokenje sem volt
      res.json({
        success: true,
        message: 'Logout cannot be done, you have not been signed in!'
      });
    }
    //TODO: ha volt ervenyes tokenje (be volt jelentkezve) akkor ezt a tokent rarakjuk egy 
    //feketelistara, es ennyi, ha el akar erni a user egy protected route-ot, akkor nem fogm enni a blacklist miatt
    //helyette ujra be kell jelentkeznie
  }

  module.exports =logoutIfClientHasBeenSignedIn;