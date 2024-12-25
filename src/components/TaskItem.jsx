import { CheckCircle, Edit, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const TaskItem = ({ task, index, toggleTaskCompletion, deleteTask, editTask }) => {
  // Dropdown options for category
  const categoryOptions = ['Personal', 'Work'];

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCategory, setEditedCategory] = useState(task.category);

  const handleSaveEdit = () => {
    editTask(index, { ...task, title: editedTitle, description: editedDescription, category: editedCategory });
    setIsEditing(false);
  };

  return (
    <div
      key={index}
      className={`p-4 mb-4 rounded-xl border shadow-sm ${
        task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-300'
      } transition duration-200 transform hover:scale-105 flex justify-between items-center`}
    >
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              className="text-lg font-semibold mb-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="text-sm mb-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <select
              className="text-sm p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              {categoryOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
            <span className="text-xs text-gray-500 italic">{task.category}</span>
          </>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => toggleTaskCompletion(index)}
          className="text-green-500 hover:text-green-700 transition duration-150 ease-in-out"
        >
          <CheckCircle size={24} />
        </button>
        <button
          onClick={() => deleteTask(index)}
          className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
        >
          <Trash2 size={24} />
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
        >
          <Edit size={24} />
        </button>
        {isEditing && (
          <button
            onClick={handleSaveEdit}
            className="ml-2 py-1 px-4 text-white bg-green-600 hover:bg-green-500 rounded-lg"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    completed: PropTypes.bool,
  }),
  index: PropTypes.number,
  toggleTaskCompletion: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
};

export default TaskItem;
