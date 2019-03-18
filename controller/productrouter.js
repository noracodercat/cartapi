var express = require('express')
var router = express.Router();
const config = require('../config');
let User = require('../models/user');
let Product =require('../models/product')
var isValidToken = require('../auth/middleware/isvalidtoken');
var mongoose= require('mongoose');

//base route is : '/product'


router.get('/all',isValidToken, function(req,res,next){
    Product.find({available:true})
            .then( result => {res.json({
                                        success:true, 
                                        message: "", 
                                        products: result
                                       });
                             }
            )
            .catch(err =>{ 
                            res.status(500).json({
                                        success:false,
                                         message: "Error has happened when querying the database"
                                        });
                         }
            );
});

router.get('/userscartjoinedtoproducts',isValidToken, async function(req,res,next){
    
    User.aggregate([   
     {
        $unwind: "$cart.items"
     }
        
    ,{   
        $lookup: {
            from: "products",
            localField: 'cart.items.id',
            foreignField: "id",
            as: "item_data"
            }
    }]).allowDiskUse(true)
    .exec(function(err, data) {
        if (err) {
            console.log('err', err);
            res.status(500).json({
                success:false,
                message: "Error has happened when querying the database"
            });
        } else{
            res.json({
                success:true,
                message:"",
                joinedCollections: data
            });
        }
        /*console.log('data',data);
        console.log('-----------------------');
        console.log(data[0].cart);
        console.log(data[0].item_data[0]);
        console.log('whole item_data array length: '+data[0].item_data.length);console.log('-----------------------');
        console.log(data[1].cart);
        console.log(data[1].item_data[0]);
        console.log('whole item_data array length: '+data[1].item_data.length);
        */
    }); 
    
});


module.exports = router;
