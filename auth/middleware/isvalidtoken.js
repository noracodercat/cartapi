let jwt = require('jsonwebtoken');
const config = require('../../config');
let TokenBlackList = require('../../models/token');

let isValidToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); //"Bearer <token>"-> <token>
    }

    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        //TODO: check hogy nincs e feketelistan ez a token, ha feketelistan van akkor elbukott az autentikalas
        TokenBlackList.findOne({token: token}).then(function(result){
              
              if (result !=null){ //feketelistas az adott token
                return res.json({ 
                  success: false,
                  message: 'Token is not valid'
                });
              } else { 
                req.token = decodedToken;
                next(); 
              }
        }).catch(function(err){ 
              req.token = decodedToken;
              next();
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = isValidToken;