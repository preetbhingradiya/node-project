import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
  const User = mongoose.model("server", schema);

  export default User;