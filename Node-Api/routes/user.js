import express  from "express";
import { deleteid, findid, getuser, showuser, updateid } from "../controllers/user-logic.js";

const router =express.Router()

router.get("/users/all",getuser);
  
router.post("/users/add",showuser);

//same route name then also can decler this method
router.route('/userid/:id').get(findid).patch(updateid).delete(deleteid)

// router.get('/userid/:id',findid)
// router.patch('/userid/:id',updateid)
// router.delete('/userid/:id',deleteid)

export default router 