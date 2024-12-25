import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  categories: JSON.parse(localStorage.getItem('categories')) || [
    { name: 'Personal', id: 1, color: 'blue' },
    { name: 'Work', id: 2, color: 'green' }
  ],
  theme: localStorage.getItem('theme') || 'light',
  search: '',
  newCategory: ''
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskCompletion(state, action) {
      const index = action.payload;
      state.tasks[index].completed = !state.tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    addCategory(state, action) {
      if (
        action.payload &&
        !state.categories.some((cat) => cat.name === action.payload)
      ) {
        const newCategoryObj = { name: action.payload, id: Date.now(), color: 'defaultColor' };
        state.categories.push(newCategoryObj);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      }
    },
    deleteCategory(state, action) {
      const categoryToDelete = action.payload;
      state.categories = state.categories.filter(
        (cat) => cat.name !== categoryToDelete
      );
      localStorage.setItem('categories', JSON.stringify(state.categories));
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setNewCategory(state, action) {
      state.newCategory = action.payload;
    },
    editTask(state, action) {
      const { index, updatedTask } = action.payload;
      state.tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  }
});

export const {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  addCategory,
  deleteCategory,
  toggleTheme,
  setSearch,
  setNewCategory,
  editTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
