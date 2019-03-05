var express = require('express')
var router = express.Router();
const config = require('../config');
let User = require('../models/user');
var isValidToken = require('../auth/middleware/isvalidtoken');

//base route is : '/cart'

router.get('/', isValidToken, function(req,res){
    User.findOne({username:req.token.username}).then(function(result){
        console.log('Before error occurred when communicating with the database' + result);
        console.log('cart: '+result.cart);
      if( result!= null){
        res.json({
          success:true,
          message:'Successful operation, cart data is read',
          cart: result.cart
        })
      } else {
        res.json({
          success:false,
          message: 'The user does not exist in the database'
        });
      }
    }).catch(function(err){
      res.json({
        success:false,
        message: 'An error occurred when communicating with the database'
      });
    });
});

router.post('/', isValidToken, function(req,res){
    User.findOneAndUpdate({username:req.token.username}, {cart: req.body.cart}).then(function(oldUser){
      if(oldUser != null){
          User.findOne({username:req.token.username}).then(updatedUser =>{
            res.json({
                success:true,
                message:'New cart is created for the specified user',
                cart: updatedUser.cart
              });
          }).catch( err =>{
            res.json({
                success:false,
                message: 'An error occurred when communicating with the database'
              });
          });
      } else{
        res.json({
          success:false,
          message: 'The user does not exist in the database'
        });
      }
    }).catch(function(err){
      res.json({
        success:false,
        message: 'An error occurred when communicating with the database'
      });
    });
});

router.delete('/', isValidToken, function(req,res){
  User.findOne({username: req.token.username}).then(function(resultUser){
    if (resultUser!= null){
      resultUser.cart = {items: []};
      resultUser.save(function(err){
        if (err){
          res.json({
            success:false,
            message:'The cart deleting was not successful for some reason, try again later please. The error was: ' +err.message
          });
        } else {
          res.json({
            success:true,
            message:'The cart deleting was successful'
          });
        }
      })
    } else {
      res.json({
        success:false,
        message: 'The user does not exist in the database'
      });
    }
  }).catch(function(err){
    res.json({
      success:false,
      message: 'An error occurred when communicating with the database'
    });
  });
});







module.exports = router;