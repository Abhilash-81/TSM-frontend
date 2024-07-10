import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    task:null,
  },
  reducers: {
    addTasks: (state, action) => {
      state.task=action.payload
    },
    removeTasks: (state, action) => {
      return null;
    },
  },
});

export const { addTasks, removeTasks } = taskSlice.actions;

export default taskSlice.reducer;
