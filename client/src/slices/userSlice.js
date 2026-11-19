// File: src/reducers/userSlice.js
// This file holds our state, actions and reducers that deal with users

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create base url
const userURL = 'http://localhost:3001/api/users';

// set up initial state for users
const initialState = {
  userList: [],
  user: {},
  status: 'idle',
  errors: null,
  message: null,
}

// Create our actions
// get All
export const fetchUserList = createAsyncThunk('users/FetchUserList', async() => {
  console.log('Fetching users...');
  try {
    const response = await axios.get(userURL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
});

// Add user
export const addNewUser = createAsyncThunk('users/AddNewUser', async(newUser) => {
  console.log('Adding User');
  try {
    const response = await axios.post(`${userURL}/add`, newUser);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async(user) => {
  console.log(`UpdatingUser id: ${user.id}`);
  const id = user.id;
  try {
    const response = await axios.put(`${userURL}/edit/${id}`, user);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// delete user
export  const deleteUser = createAsyncThunk('users/deleteUser', async({id}) => {
  console.log(`Deleting User with id ${id}`);
  try {
    const response = await axios.delete(`${userURL}/delete/${id}`);
    if (response.status === 204) return {id};
    return `${response.status}: ${response.statusText}`;
  } catch (err) {
    return err.message;
  }
});

// Create slices
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state, action) => {
        state.status = 'loading';
        state.message = 'loading';
        state.errors = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = null;
        state.errors = null;
        state.userList = action.payload;
        state.currentRequestId = undefined;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
        state.errors = action.error.message;
      })
      // Add user cases
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = null;
        state.errors = null;
        state.userList.push(action.payload);
      })
      // Edit user cases
      .addCase(updateUser.fulfilled, (state, action) => {
        if(!action.payload){
          console.log('Update could not complete.');
          state.message = 'Update could not complete';
          return;
        }
        state.message = null;
        console.log(action.payload.id);
        const list = state.userList.map(item => item.id === action.payload.id ? (item = action.payload) : item);
        console.log(list);
        state.user = action.payload;
        state.errors = null;
        state.userList = list;
      })
      // Delete user cases
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if(!action.payload.id){
          console.log(`Delete could not complete`)
          console.log(action.payload);
          state.message = 'Delete could not complete';
          state.errors = action.payload;
          return;
        }
        state.message = null
        const list = state.userList.filter(item => item.id !== action.payload.id );
        state.userList = list;
      })
  }
})
// Export selector
export const selectAllUsers = state => state.users.userList;
export const selectUserStatus = state => state.users.status;
export const selectUserError = state => state.users.errors;
export const selectUserMessage = state => state.users.message;
export const selectUserById = (state, id) => state.users.userList.find(item => item.id === id );

// Export the reducer
export default userSlice.reducer;