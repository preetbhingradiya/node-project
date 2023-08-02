import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      unique:true,
      required:true,
    },
    password:{
      type:String,
      unique:true,
      select:false
    },
    createAt:{
      type:Date,
      default:Date.now,
    }
  });
  
  const User = mongoose.model("server", schema);

  export default User;