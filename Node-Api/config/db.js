import mongoose from "mongoose";
import { config } from "dotenv";
config('.env')

const database=()=>{
    mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "backendapi",
  })
  .then(() => console.log("database conect"))
  .catch((e) => console.log(e.message));
}

export default database