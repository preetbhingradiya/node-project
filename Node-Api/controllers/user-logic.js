import User from "../model/schema-model.js";
import bcrypt from "bcrypt";
import { setcookie } from "../utils/fetuser.js";
import jwt from "jsonwebtoken";

export const getuser = async (req, res) => {
  const userdata = await User.find({});

  res.json({
    success: true,
    userdata,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const oneuser = await User.findOne({ email }).select("+password"); //schema pass is seclect:false

  if (!oneuser) {
    res.status(404).json({
      Messagte: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, oneuser.password);

  if (!isMatch) {
    res.status(404).json({
      Messagte: "Invalid email or password",
    });
  }

  setcookie(oneuser, res, `Welcome Back, ${oneuser.name}`, 201);
};

export const register = async (req, res) => {
  let { name, email, password } = req.body;

  const matchemail = await User.findOne({ email });

  if (matchemail) {
    res.status(404).json({
      Messagte: "User Alredey Exit",
    });
  } else {
    const hashpass = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      email,
      password: hashpass,
    });

    setcookie(data, res, "User add", 201);
  }
};

export const myprofile = async (req, res) => {
  let id = "myid";

  const { token } = req.cookies;


  if (!token) {
    res.status(404).json({
      Messagte: "Login First",
    });
  } 
  else {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = await User.findById(decode._id);
    res.status(201).json({
      success: true,
      userId,
    });
  }
};
