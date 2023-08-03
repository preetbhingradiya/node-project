import express  from "express";
import {  getuser,  login,  logout,  myprofile,  register,  } from "../controllers/user-logic.js";
import { isAuthentic } from "../middlewares/authentic.js";

const router =express.Router()

router.get("/all",getuser);
  
router.post("/login",login);

router.post("/register",register);

router.get("/logout",logout)

router.get("/profile",isAuthentic,myprofile)

// router.route('/userid/:id').get(findid).patch(updateid).delete(deleteid)
//same route name then also can decler this method
// router.get('/userid/:id',findid)
// router.patch('/userid/:id',updateid)
// router.delete('/userid/:id',deleteid)

export default router 