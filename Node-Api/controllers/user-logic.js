import User from "../model/schema-model.js";

 export const getuser = async (req, res) => {
  const userdata = await User.find({});

  res.json({
    success: true,
    userdata,
  });
};

export const showuser=async (req, res) => {
  
    let {name,email,password}=req.body

     await User.create({
    name,
    email,
    password
  });

  res.status(201).cookie("tempi","store").send(req.body);
}

export const findid=async(req,res)=>{
    // let {id}=req.query
    // const userid=await User.findById(id)

    const userid=await User.findById(req.params.id)

    res.send(userid)
}

export const updateid=async(req,res)=>{

    const userid=await User.findByIdAndUpdate(req.params.id,req.body)

    res.send(userid)
}

export const deleteid=async(req,res)=>{

    const userid=await User.findByIdAndDelete(req.params.id)

    res.send(userid)
}

