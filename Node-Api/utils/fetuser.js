import jwt from "jsonwebtoken";

export const setcookie = (data, res, Message, statuscode = 201) => {
  const id = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);

  res
    .status(statuscode)
    .cookie("token", id, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15 min
      sametime: process.env.NODE_ENV === "devlopment" ? "lax" : "none",    //fronde and backen dame delpoye
      secure: process.env.NODE_ENV === "devlopment" ? false : true,
    })
    .json({
      Message,
    });
};
