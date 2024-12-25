import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../Redux/tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  }
});

export default store;
