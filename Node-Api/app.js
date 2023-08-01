import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.js";
import database from "./config/db.js";
import { config } from "dotenv";
import cookie from "cookie-parser";

config({path:".env"})

const app = express();


app.use(express.json())
app.use(router)



app.listen(process.env.PORT, () => {
  console.log("server is working");
  database()
});
