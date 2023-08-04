import express from "express";
import router from "./routes/user.js";
import taskrouter from "./routes/task.js";
import database from "./config/db.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

config({path:".env"})

const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:[process.env.FRONTED_URL],
  methods:["GET","POST","PATCH","DELETE"],
  credentials:true,
}))

app.use("/users",router)
app.use("/task",taskrouter)


app.listen(process.env.PORT, () => {
  console.log(`server is working on port:${process.env.PORT}`);
  database()
});
