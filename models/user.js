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
    email: { type: String, unique: true },
    username: String,
    password: String,
    cart: CartSchema
});


module.exports= mongoose.model("User", UserSchema);
