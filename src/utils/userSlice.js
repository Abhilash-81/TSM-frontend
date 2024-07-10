import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    token: null,
    email: null,
  },
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        email: action.payload.email,
      };
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
