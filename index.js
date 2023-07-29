import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import  Jwt  from "jsonwebtoken";

mongoose.connect("mongodb://127.0.0.1:27017")
  .catch((e) => console.log(e))
  .then(() => console.log("data base is connect"));

const userchema=new mongoose.Schema({
    name:String,
    email:String,
})

const User=mongoose.model("user",userchema)


// const user = [];

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
  res.render("index", { name: "varun" });
});


{
  app.get('/login',async(req,res)=>{
    const {token}=req.cookies
    if(token){

      const decode=Jwt.verify(token,"sdfguikmnfchjwio")  //same keys is passed sdfguikmnfchjwio
      req.data =await User.findById(decode._id)

      res.render('logout',{name:req.data.name})
    }
    else{
      res.render('login')
    }
  })
  
  app.post('/login',async(req,res)=>{

    const data=await User.create(req.body)   //change body in to data

    const id=Jwt.sign({_id:data._id},"sdfguikmnfchjwio")

    res.cookie("token",id,{
      httpOnly:true,
    })
    res.redirect('/login')   //login get routes pe lajegi
  })
  
  app.get('/logout',(req,res)=>{  //get method use becuase no any informtion show
    res.cookie("token",null,{
      expires:new Date(Date.now())
    })
    res.redirect('/login')  
  })
}

app.listen(4000, () => {
  console.log("port is run");
});
