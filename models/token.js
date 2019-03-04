var mongoose= require('mongoose');


var JsonWebTokenSchema= new mongoose.Schema({
    token: { type: String, unique: true },
    expireAt: {type: Date}
});


module.exports= mongoose.model("TokenBlackList", JsonWebTokenSchema);
