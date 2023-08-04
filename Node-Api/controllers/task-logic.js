import task from "../model/task.js";

export const newTask = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: error.name,
    });
  }
};

export const myTask = async (req, res) => {
  try {
    const id = req.userId._id;
    const matchtask = await task.find({ user: id });

    res.status(201).json({
      sucsses: true,
      matchtask,
    });
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: error.name,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const update = await task.findById(req.params.id);

    update.iscompleted = !update.iscompleted; //true hoi to fasle , fasle hoi to true

    if (!update) {
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
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: error.name,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      sucsses: false,
      message: error.name,
    });
  }
};
