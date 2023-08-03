import task from "../model/task.js";

export const newTask = async (req, res) => {
  const { title, description } = req.body;
  await task.create({
    title,
    description,
    user: req.userId, //only login user can add task
  });

  res.status(201).json({
    sucsses: true,
    Message: "Task added",
  });
};

export const myTask = async (req, res) => {
  const id = req.userId._id;
  const matchtask = await task.find({ user: id });

  res.status(201).json({
    sucsses: true,
    matchtask,
  });
};

export const updateTask = async (req, res) => {
  const update = await task.findById(req.params.id);

  update.iscompleted = !update.iscompleted; //true hoi to fasle , fasle hoi to true

  if (!remove) {
    res.status(200).json({
      sucsses: false,
      Message: "Invalid Id",
    });
  }

  await update.save();

  res.status(200).json({
    sucsses: true,
    Message: "Task is upadete",
  });
};

export const deleteTask = async (req, res) => {
  const remove = await task.findById(req.params.id);

  if (!remove) {
    res.status(200).json({
      sucsses: false,
      Message: "Invalid Id",
    });
  }

  await remove.deleteOne();

  res.status(200).json({
    sucsses: true,
    Message: "Task is delete",
  });
};
