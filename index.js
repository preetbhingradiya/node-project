import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path  from "path";


mongoose
  .connect("mongodb://127.0.0.1:27017")
  .catch((e) => console.log(e))
  .then(() => console.log("data base is connect"));

const userchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userchema);

// const user = [];

const app = express();
app.use(express.static(path.join(path.resolve(),"public")))  //public folder uplode
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index", { name: "varun" });
});

{
  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/login", async (req, res) => {
    const { token } = req.cookies;
    if (token) {
      const decode = Jwt.verify(token, "sdfguikmnfchjwio"); //same keys is passed sdfguikmnfchjwio
      req.data = await User.findById(decode._id);

      res.render("logout",{name:req.data.name});
    } else {
      res.render("login");
    }
  });

  app.post("/register", async (req, res) => {
    const { name,email,password } = req.body;

    const cheack = await User.findOne({ email });
    if (cheack) {
      return res.redirect("/login");
    } else {

      const hashedpassword=await bcrypt.hash(password,10)  //read hash password

      const data = await User.create({
        name,
        email,
        password:hashedpassword,
      });

      const id = Jwt.sign({ _id: data._id }, "sdfguikmnfchjwio");

      res.cookie("token", id, {
        httpOnly: true,
      });
      res.redirect("/login");
    }
  });

  app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    //check email
    const check = await User.findOne({ email });
    if (!check ) {
      return res.redirect("/register");
    }


    //check password
    // const match= check.password=== password
    const match=await bcrypt.compare(password,check.password)
    if(match){
      
      const id = Jwt.sign({ _id: check._id }, "sdfguikmnfchjwio");

      res.cookie("token", id, {
        httpOnly: true,
      });
      res.redirect("/login")
    }else{
     res.render('login',{email ,message:"Invalid password"})
    }

  });

  app.get("/logout", (req, res) => {
    //get method use becuase no any informtion show
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.redirect("/login");
  });
}

app.listen(4000, () => {
  console.log("port is run");
});
