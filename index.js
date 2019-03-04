var app =require('express')();
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var jwt = require('jsonwebtoken');
const config = require('./config');


var User = require('./models/user');
var TokenBlackList = require('./models/token');

var loginRouter = require('./auth/loginrouter');
var isValidToken = require('./auth/middleware/isvalidtoken');
var logoutIfClientHasBeenSignedIn = require('./auth/middleware/logoutifpossible');

mongoose.connect("mongodb://localhost/cart_api_db");
mongoose.Promise=global.Promise;
/*
var us= new User({email: 'valaki@gmail.com', password: 'titok123'});
us.save().then().catch(function(err){

});*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/login', loginRouter);

app.get('/logout', logoutIfClientHasBeenSignedIn);

app.get('/dashboard', isValidToken, function(req, res) {
  res.json({dashboard: 'You reached the protected route'});
});


app.listen(3000);
