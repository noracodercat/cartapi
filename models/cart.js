var mongoose= require('mongoose');


var CartSchema= new mongoose.Schema({
    user_id: { type: String, unique: true },
    
});


module.exports= mongoose.model("Cart", CartSchema);
