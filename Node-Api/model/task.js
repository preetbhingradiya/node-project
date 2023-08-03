import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    iscompleted:{
      type:Boolean,
      default:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"server",
        required:true,
    },
    createAt:{
      type:Date,
      default:Date.now,
    }
  });
  
  const task = mongoose.model("task", schema);

  export default task;