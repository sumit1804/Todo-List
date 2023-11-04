import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description) => {
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "alok.yadav6000@gmail.com",
    to: email,
    subject: subject,
    html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const createdTask = await taskModel.create({
      title: title,
      description: description,
      userId: userId,
      completed: false,
    });
    return res.json({
      success: true,
      message: "task added successfully",
      taskId: createdTask._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const removeTask = (req, res) => {
  console.log("Request recieved");
  const { id } = req.body;
  console.log("id: ", id);
  taskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({
      userId: req.user.id,
    });

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const TaskStatusChange = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const task = await taskModel.findById({
      _id: id,
    });

    let val = false;
    if (task.completed === false) {
      val = true;
    }

    const result = await taskModel.findOneAndUpdate(
      { _id: id },
      {
        completed: val,
      }
    );

    return res.json({
      success: true,
      message: "Task Status changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addTask, getTask, removeTask, TaskStatusChange };
