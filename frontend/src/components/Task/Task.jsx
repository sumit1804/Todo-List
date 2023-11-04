import React from "react";
import moment from "moment";
import "./task.css";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import DeleteIcon from "@mui/icons-material/Delete";
import TokenContext from "../../context/TokenContext.js";
import axios from "../../Axios/axios.js";
function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  const handleRemove = async (id) => {
    console.log("hello");
    console.log(id);
    const res = await axios.delete("/task/removeTask", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        id: id,
      },
    });
    console.log(res);
    dispatch({
      type: "REMOVE_TASK",
      id,
    });
  };

  const handleMarkDone = async (id) => {
    const result = await axios.post(
      "/task/change-status",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (result.data.success === true) {
      dispatch({
        type: "CHANGE_STATUS",
        id,
      });
    }
  };
  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handleMarkDone(id)}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className=" italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now </p>
          )}
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={() => {
            handleRemove(id);
          }}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
