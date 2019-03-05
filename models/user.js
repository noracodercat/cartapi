var mongoose= require('mongoose');

/*
var CartSchema= new mongoose.Schema({
    items: { 
        type:[CartItemSchema] , 
        default:[]
    } 
});

var CartItemSchema = new mongoose.Schema({
     
        itemId: {type:String, unique:true }, 
        amount: Number
});
*/
var CartSchema= new mongoose.Schema({
    items:[
        { 
            id: {type:String, unique:true }, 
            amount: Number
        }
    ]
});

var UserSchema= new mongoose.Schema({
    //email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    cart: {type: CartSchema, default: {items: []}}  
});


module.exports= mongoose.model("User", UserSchema);
