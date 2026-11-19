import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Import setAuthToken function
import setAuthToken from '../utils/setAuthToken';

// Create base URL
const baseURL = 'http://localhost:3001/api/auth';

// Create initial state for auth
const initialState = {
  user: {},
  token: '',
  isAdmin: false,
  isAuth: false,
  status: 'idle',
  error: null
}
// Create actions
export const login = createAsyncThunk('auth/login', async({email, password}) => {
  // log function call
  console.log('Logging in - authSlice');
  try {
    // get response from our api
    const response = await axios.post(`${baseURL}/login`, ({email, password}));
    // log response
    console.log(response.data.token);
    if (response.data){
      if(response.status === 400){
        throw new Error({ message: response.data});
      }
      // Setting the response from the API to local storage.
      localStorage.setItem('token', response.data.token);

      // have a function to deal with the token
      setAuthToken(localStorage.token);

      // get the user from the database. (get the logged in user)
      const res = await axios.get(`${baseURL}`);
      console.log(' AUTHSLICE - User login details:', res.data);
      console.log('Admin value:', res.data.isAdmin);
      return res.data;
    }
  } catch (err) {
    // log errors
    console.log('Error logging in');
    console.log(err.message);
    return err;
  }
});

// loadUser action
export const loadUser = createAsyncThunk('auth/loadUser', async() => {
  console.log('Load User - authSlice');
  try {
    const response = await axios.get(`${baseURL}`);
    //console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
});

// register action
export const register = createAsyncThunk('auth/register', async(newUser) => {
  console.log('Create new user - authSlice');
  try {
    const response = await axios.post(`${baseURL}/register`, newUser);
    console.log(response.data); // token
    // if we get a response
    if(response.data){
      if(response.status === 400){
        throw new Error({ message: response.data});
      }
      localStorage.setItem('token', response.data.token);

      // have a function to deal with the token
      setAuthToken(localStorage.token);

      // get the user from the database. (get the logged in user)
      const res = await axios.get(`${baseURL}`);
      console.log(res.data);
      return res.data;
    }
  } catch (err) {
    console.log('Error logging in');
    console.log(err.message);
    return err.message;
  }
});

// create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout reducer');
      localStorage.removeItem('token');
      state.token = null;
      state.isAuth = false;
      state.isAdmin = false;
      state.user = null;
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      // login.pending
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      // login.fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuth = true;
        state.isAdmin = action.payload.isAdmin;
        state.token = localStorage.getItem('token');
        state.user = action.payload;
        state.error = null;
      })
      // login.rejected
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.isAdmin = false;
        state.token = null;
        localStorage.removeItem('token');
        state.user = null;
        state.error = action.payload;
      })
      // loadUser.pending
      .addCase(loadUser.pending, (state, action) => {
        state.status = 'loading';
      })
      // loadUser.fulfilled
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = localStorage.getItem('token');
        state.isAuth = true;
        state.isAdmin = action.payload.isAdmin;
        state.user = action.payload;
        state.error = null;
      })
      // loadUser.rejected
      // register.pending
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      // register.fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuth = true;
        state.isAdmin = action.payload.isAdmin;
        state.token = localStorage.getItem('token');
        state.user = action.payload;
        state.error = null;
      })
      // register.rejected
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuth = false;
        state.isAdmin = false;
        state.token = null;
        localStorage.removeItem('token');
        state.user = null;
        state.error = action.payload;
      })
  }
});

// Export selectors
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsAdmin = (state) => state.auth.isAdmin;
export const getAuthUser = (state) => state.auth.user;

// Export authSlice actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;