var express = require('express')
var router = express.Router();
const config = require('../config');
let User = require('../models/user');
var isValidToken = require('../auth/middleware/isvalidtoken');

//base route is : '/cart'

router.get('/', isValidToken, function(req,res){
    User.findOne({username:req.token.username}).then(function(result){
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
      resultUser.cart.items =  [];
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

//delete cartItem by its id , delete method, url is /:id
router.delete('/:itemId', isValidToken, function(req,res){

  User.findOne({username: req.token.username}).then(function(resultUser){
    if (resultUser!= null && resultUser.cart !=null &&  resultUser.cart.items != null ){
      resultUser.cart.items =  resultUser.cart.items.filter(function(item){
        return item.id !== req.params.itemId;
      });
      resultUser.save(function(err){
        if (err){
          res.json({
            success:false,
            message:'The cart-item deleting was not successful for some reason, try again later please. The error was: ' +err.message
          });
        } else {
          res.json({
            success:true,
            message:'The cart-item deleting was successful'
          });
        }
      });
    } else{
      res.json({
        success:false,
        message: 'The user does not exist in the database or the user does not have a cart or the cart is empty'
      });
    }
  }).catch(function(err){
    res.json({
      success:false,
      message: 'An error occurred when communicating with the database'
    });
  });
});


//put cartItem change ,put method, url is: /
router.put('/', isValidToken, function(req,res){
  let itemId = req.body.itemId;
  let newAmount = req.body.amount;
  User.findOne({username:req.token.username}).then(function(resultUser){
    if(resultUser != null && resultUser.cart !=null &&  resultUser.cart.items != null){
      let cartAlreadyContainsThisItem=false;
      for (let item of resultUser.cart.items){
        if (item.id == itemId){
          cartAlreadyContainsThisItem =true;
          item.amount = newAmount;
          break;
        } 
      }
      if (cartAlreadyContainsThisItem ==false){
        resultUser.cart.items.push({id: itemId,amount:newAmount});
      }
      resultUser.save(function(err){
        if (err){
          res.json({
            success:false,
            message:'The cart-item modifying was not successful for some reason, try again later please. The error was: ' +err.message
          });
        } else {
          res.json({
            success:true,
            message:'The cart-item modifying was successful'
          });
        }
      });
    } else {
      res.json({
        success:false,
        message: 'The user does not exist in the database or the user does not have a cart or the cart is empty'
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