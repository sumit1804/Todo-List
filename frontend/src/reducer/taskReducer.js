function sortFunction(a, b) {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? -1 : 1;
}

function taskReducer(tasks, action) {
  console.log("taskreducer");
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
    case "ADD_TASK": {
      const new_tasks = [
        ...tasks,
        {
          _id: action.id,
          title: action.title,
          description: action.description,
          createdAt: action.date,
          completed: false,
        },
      ];

      const sorted_by_date = new_tasks.sort(sortFunction);
      return sorted_by_date;
    }
    case "SET_TASK": {
      const sorted_by_date = action.payload.sort(sortFunction);
      return sorted_by_date;
    }
    case "REMOVE_TASK": {
      return tasks.filter((task, index) => task?._id !== action.id);
    }
    case "CHANGE_STATUS": {
      return tasks.map((task, index) => {
        if (task?._id === action.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    }
    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
}

export default taskReducer;
