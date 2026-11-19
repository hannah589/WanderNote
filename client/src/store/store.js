// Store.js
// This file allows us to create a store/containers to hold the state for our application.
// We need to bring in configureStore from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import reducers from our slices
import destinationReducer from '../slices/destinationSlice';
import userReducer from '../slices/userSlice'
import authReducer from '../slices/authSlice';
import adminReducer from '../slices/adminSlice';
//import noteReducer from '../slices/noteSlice';

// Configure the store
// makes the slices available to the entire app. Connected to the provider, the provider provides the store, in main.jsx
export const store = configureStore({
  reducer: {
    destination: destinationReducer,
    user: userReducer,
    auth: authReducer,
    admin: adminReducer
  },
  devTools: true
});