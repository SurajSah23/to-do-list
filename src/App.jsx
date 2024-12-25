import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import TaskItem from "./components/TaskItem";
import {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  addCategory,
  deleteCategory,
  toggleTheme,
  setSearch,
  editTask,
} from "./Redux/tasksSlice";

const App = () => {
  const dispatch = useDispatch();
  const { tasks, categories, theme, search } = useSelector(
    (state) => state.tasks
  );
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: categories[0]?.name || "Personal",
    completed: false,
  });
  const [newCategory, setNewCategory] = useState("");

  const handleAddTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      title: "",
      description: "",
      category: categories[0]?.name || "Personal",
      completed: false,
    });
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.some((cat) => cat.name === newCategory)) {
      dispatch(addCategory(newCategory));
      setNewCategory(""); // Clear the input after adding
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    if (categoryToDelete !== "Personal") {
      dispatch(deleteCategory(categoryToDelete));
    } else {
      alert("You cannot delete the 'Personal' category.");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-3 rounded-full absolute top-5 right-5 border bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 transition-all duration-300"
        >
          <span role="img" aria-label="toggle-theme">
            {theme === "dark" ? "🌞" : "🌙"}
          </span>
        </button>

        {/* Search Bar */}
        <input
          type="text"
          className="border p-3 rounded-md mb-6 w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        {/* Add Task Form */}
        <div className="mb-6 p-5 rounded-md shadow-md bg-gray-50 dark:bg-gray-700">
          <div className="flex flex-col sm:flex-row mb-4 gap-4">
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-3 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              className="border p-3 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Add Task
          </button>
        </div>

        {/* Add Category Section */}
        <div className="mb-6 p-5 rounded-md shadow-md bg-gray-50 dark:bg-gray-700">
          <input
            type="text"
            className="border p-3 rounded-md w-full mb-4 focus:ring-2 focus:ring-green-500"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all duration-200"
          >
            Add Category
          </button>
        </div>

        {/* Categories List */}
        <div className="mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between mb-2 p-3 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category.name)}
                className="text-red-500 hover:text-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Display Tasks */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={task.title}
              task={task}
              index={index}
              toggleTaskCompletion={(index) =>
                dispatch(toggleTaskCompletion(index))
              }
              deleteTask={(index) => dispatch(deleteTask(index))}
              editTask={(index, updatedTask) =>
                dispatch(editTask({ index, updatedTask }))
              }
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

App.propTypes = {
  theme: PropTypes.string,
  tasks: PropTypes.array,
  categories: PropTypes.array,
};

export default App;
