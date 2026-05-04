import { useState, useEffect } from "react";
import "./App.css";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleAddTask() {
    if (newTask.trim() === "") {
      alert("Por favor digite uma atividade.");
    } else {
      addTask(newTask);
      setNewTask("");
    }
  }

  function addTask(task) {
    const newItem = {
      id: Date.now(),
      text: task,
    };

    setTasks([...tasks, newItem]);
  }

  function editTask(id, newText) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: newText };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-linear-to-br from-indigo-950 via-slate-900 to-cyan-950">
        {" "}
        <div className="bg-white rounded-md  min-h-100 max-h-screen w-100 p-5 shadow-md flex flex-col gap-5">
          <div className="flex flex-row items-center gap-3">
            <FaTasks className="text-xl text-blue-800" />
            <h1 className="text-3xl font-semibold text-left text-blue-800">
              Todo List
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              name="task"
              id="taskID"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
              placeholder="Digite sua atividade"
              className="p-3 border border-gray-200 rounded-lg h-10 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            />
            <button
              className="text-2xl border rounded-lg h-10 w-20 flex items-center justify-center cursor-pointer bg-blue-500 text-white  hover:bg-blue-900 transition-colors duration-200"
              onClick={handleAddTask}
            >
              <IoMdAdd />
            </button>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Atividades</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200 hover:bg-gray-200 transition"
              >
                <span>{task.text}</span>
                <div className="flex flex-row gap-3">
                  <button
                    className="opacity-0 group-hover:opacity-100 transition text-blue-400 hover:text-blue-700 cursor-pointer text"
                    onClick={() => {
                      const newText = prompt(
                        "Digite o novo texto para a atividade:",
                        task.text,
                      );

                      if (newText) {
                        editTask(task.id, newText);
                      }
                    }}
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-700 cursor-pointer text-2xl"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
