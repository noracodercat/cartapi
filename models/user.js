var mongoose= require('mongoose');


var CartSchema= new mongoose.Schema({
    items:[
        { 
            id: {type:String, unique:true }, 
            amount: Number
        }
    ]
});

var UserSchema= new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    cart: {type: CartSchema, default: {items: []}}  
});


module.exports= mongoose.model("User", UserSchema);
