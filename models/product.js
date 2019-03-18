var mongoose= require('mongoose');


var ProductSchema= new mongoose.Schema({
    id: {type:String, unique:true }, 
    name:  {type:String,required:true  },
    available: {type: Boolean, default: true},
    weightInG: Number,
    price: Number,
    imageUrl:String
});


module.exports= mongoose.model("Product", ProductSchema);
