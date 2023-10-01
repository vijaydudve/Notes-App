const mongoose = require("mongoose");
const JWT = require('jsonwebtoken')

const UserSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    address:{
        type:String,
    },
    contact:{
        type:String,
    },
  },
);

UserSchema.methods.generateAuthToken = async function(){
  try{
      let tokenData = JWT.sign({_id:this._id},'VIJAYVJCOSNOCSN')
      return tokenData
  }
  catch(err){
      console.log(err)
  }
}


const User = mongoose.model("User", UserSchema);
module.exports = User;