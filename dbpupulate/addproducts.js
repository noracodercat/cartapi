var mongoose= require('mongoose');
let Product = require('../models/product');

mongoose.connect("mongodb://localhost/cart_api_db");
mongoose.Promise=global.Promise;


async function myFunc(){
    await Product.create({
        id: "3453",
        name: "Fried chicken",
        available: true,
        weightInG: 200,
        price: 3,
        imageUrl: "https://as1.ftcdn.net/jpg/02/30/33/96/500_F_230339689_z0TDRqHMyu8X6mspL8bsMNzMGNsphFwX.jpg"
    });
    
    await Product.create({
        id: "2347",
        name: "Little french fries",
        available: true,
        weightInG: 100,
        price: 1,
        imageUrl:"https://as1.ftcdn.net/jpg/00/46/24/84/500_F_46248483_gyGNXtWgaJjB1VzBmsnfmiiTedw1Da2j.jpg"
    });
    
    await Product.create({
        id: "2348",
        name: "Medium french fries",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl:"https://as1.ftcdn.net/jpg/00/46/24/84/500_F_46248483_gyGNXtWgaJjB1VzBmsnfmiiTedw1Da2j.jpg"
    });
    
    await Product.create({
        id: "2349",
        name: "Big french fries",
        available: true,
        weightInG: 300,
        price: 2,
        imageUrl: "https://as1.ftcdn.net/jpg/00/46/24/84/500_F_46248483_gyGNXtWgaJjB1VzBmsnfmiiTedw1Da2j.jpg"
    });
    
    await Product.create({
        id: "3560",
        name: "Grilled pork",
        available: true,
        weightInG: 200,
        price: 3,
        imageUrl:"https://as2.ftcdn.net/jpg/01/05/07/21/500_F_105072140_0WHayQfW0F0y6TEIteRSgyWHGyg0sPMi.jpg"
    });
    
    await Product.create({
        id: "3460",
        name: "Grilled chicken breast",
        available: true,
        weightInG: 200,
        price: 3,
        imageUrl: "https://as1.ftcdn.net/jpg/00/63/12/56/500_F_63125623_bb3BJFpZV85paeVq8EQ51NnGxucKXRyy.jpg"
    });
    
    await Product.create({
        id: "3660",
        name: "Grilled beef",
        available: true,
        weightInG: 200,
        price: 3.6,
        imageUrl:"https://as1.ftcdn.net/jpg/01/16/36/28/500_F_116362893_5lM48e4YkHmmgIeVCun0L0Esl0lsuN8p.jpg"
    });
    
    await Product.create({
        id: "5540",
        name: "Hungarian Goulash",
        available: true,
        weightInG: 400,
        price: 5,
        imageUrl: "https://as1.ftcdn.net/jpg/00/26/39/58/500_F_26395888_OHodXNl4oNWl0ybPds0Vku6u2UQa6AiL.jpg"
    });
    
    await Product.create({
        id: "4300",
        name: "Caesar salad",
        available: true,
        weightInG: 350,
        price: 4,
        imageUrl:"https://as2.ftcdn.net/jpg/00/98/13/79/500_F_98137985_yWwFSr9QxRLNtlTzmC7xscOpt0VxlqeZ.jpg"
    });
    
    await Product.create({
        id: "4301",
        name: "Tuna salad",
        available: true,
        weightInG: 350,
        price: 4,
        imageUrl: "https://as2.ftcdn.net/jpg/01/14/32/03/500_F_114320375_fEB8x59VSnjzCOqhnC8UgT9zyKd5vMdR.jpg"
    });
    
    await Product.create({
        id: "4302",
        name: "Greek salad",
        available: true,
        weightInG: 350,
        price: 4,
        imageUrl:"https://as1.ftcdn.net/jpg/00/81/53/80/500_F_81538054_g0b0wl2036KW01lw35dcbWAafMMGe5tB.jpg"
    });
    
    await Product.create({
        id: "4303",
        name: "Vegan salad",
        available: true,
        weightInG: 350,
        price: 3,
        imageUrl:"https://as2.ftcdn.net/jpg/01/92/72/81/500_F_192728126_M3JmlU6eMpEWTIdM5rLuZMg707EFC1pO.jpg"
    });
    
    await Product.create({
        id: "6001",
        name: "Hamburger",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl:"https://as1.ftcdn.net/jpg/00/70/53/80/500_F_70538039_UE56ZEfXZmuV8cXGdzJ33g5ZbBwkVfhq.jpg"
    });
    
    await Product.create({
        id: "6002",
        name: "Cheeseburger",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl:"https://as1.ftcdn.net/jpg/00/73/25/22/500_F_73252209_h5SOj0Truz4dFbLLI84Urosn9bCMChVj.jpg"
    });
    
    await Product.create({
        id: "6003",
        name: "Chili hamburger",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl:"https://as1.ftcdn.net/jpg/00/10/65/56/500_F_10655613_3RoRZmEOn1ysUuzkC7NU39ujADXAPfjJ.jpg"
    });
    
    await Product.create({
        id: "6004",
        name: "Fishburger",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl:"https://as1.ftcdn.net/jpg/00/78/63/70/500_F_78637047_tjiJZL6OeKNXzYgqTC6vtqjDFENe6BEq.jpg"
    });
    
    await Product.create({
        id: "6005",
        name: "Chickenburger",
        available: true,
        weightInG: 200,
        price: 1.5,
        imageUrl: "https://as1.ftcdn.net/jpg/02/28/09/94/500_F_228099491_JJc1nkAHCZLXsfYgeBVvHxYO41kNE81O.jpg"
    });
} 

/*
function myFunc(req,res,next){
 
    Product.create({
        id: "6005",
        name: "Chickenburger",
        available: true,
        weightInG: 200,
        price: 1.5
    }).then(res => {
        //res.end();
    }).catch(err =>{
        //res.end();
    });

    
}*/

myFunc();

module.exports = myFunc;

