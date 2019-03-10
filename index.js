var app =require('express')();
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var jwt = require('jsonwebtoken');
const config = require('./config');

//plus cors
//let cors = require('cors');

var User = require('./models/user');
var TokenBlackList = require('./models/token');

var loginRouter = require('./auth/loginrouter');
var cartRouter = require('./controller/cartrouter');
var isValidToken = require('./auth/middleware/isvalidtoken');
var logoutIfClientHasBeenSignedIn = require('./auth/middleware/logoutifpossible');

mongoose.connect("mongodb://localhost/cart_api_db");
mongoose.Promise=global.Promise;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//app.use(cors());

app.use( function(req,res,next){
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.append('Access-Control-Max-Age' , '8000');
  next();
});

app.use('/login', loginRouter);

app.get('/logout', logoutIfClientHasBeenSignedIn);

app.use('/cart', cartRouter);



/*
app.get('/protectedTest', isValidToken, function(req, res) {
  res.json({dashboard: 'You reached the protected route'});
});
*/
app.listen(3000);
