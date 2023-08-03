import express  from "express";
import { deleteTask, myTask, newTask, updateTask } from "../controllers/task-logic.js";
import { isAuthentic } from "../middlewares/authentic.js";

const route=express.Router()

route.post("/new",isAuthentic,newTask)

route.get("/my",isAuthentic,myTask)

route.route("/:id").patch(isAuthentic,updateTask).delete(isAuthentic,deleteTask)


export default route