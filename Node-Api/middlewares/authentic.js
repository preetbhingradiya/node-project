import User from "../model/schema-model.js";
import jwt from "jsonwebtoken";

export const isAuthentic=async(req,res,next)=>{
    const { token } = req.cookies;

    if (!token) {
      res.status(404).json({
        Messagte: "Login First",
      });
    } 
    else {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.userId = await User.findById(decode._id);
        next()
    }
}