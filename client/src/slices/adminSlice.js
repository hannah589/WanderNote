//NTS. When get the time, move over to context. 
// File: src/slices/adminSlice.js
// This file holds our state actions and reducers that deal with admin functions

// import createSlice, asyncThunk and axios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// create the base admin url
const adminURL = 'http://localhost:3001/api/admin';

// Initial State
const initialState = {
  homepageImage: '',
  imageList: [],
  status: 'idle',
  errors: null,
  message: null
}

// fetchImageList
export const fetchImageList = createAsyncThunk('admin/fetchImageList', async() => {
  console.log('getting image list...');
  try {
    const response = await axios.get(`${adminURL}/getImageList`);
    console.log(response.data);
    return response.data;
  } catch(err){
    console.log(err.message);
    return err.message;
  }
});

// fetchImageURL
export const fetchImageURL = createAsyncThunk('admin/fetchImageURL', async(imageName) => {
  console.log('fetching image url....');
  console.log(imageName);
  try {
    const response = await axios.get(`${adminURL}/getImageURL/${imageName}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
});

// create the admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // Add in reducer for setting the image
  reducers: {
    setImage: (state) => {
      state.homepageImage = localStorage.getItem('backImage');
    }  
  },
  // Add in extra reducers for actions.
  // Remember: we need pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageURL.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = null;
        state.errors = null;
        state.homepageImage = action.payload;
        localStorage.setItem('backImage', action.payload);
      })
      .addCase(fetchImageList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = null;
        state.errors = null;
        state.imageList = action.payload;
      })
  }
})

// Export selectors
export const selectHomepageImage = state => state.admin.homepageImage;
export const selectImageList = state => state.admin.imageList;
// Export actions
export const { setImage } = adminSlice.actions;

// export the reducer
export default adminSlice.reducer;