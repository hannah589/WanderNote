// File: src/reducers/DestinationSlice.js

// This file holds our state, actions and reducers that deal with feedback.

// There are 4 different parts of this file.
// 1. initial state
// 2. actions - async functions created with createAsyncThunk
// 3. reducer - extra reducers function to deal with the async code
//4. selectors - used by component to access redux state

// Import create slice and createAsyncThunk for the redux toolkit
//redux runs in sync, thunk to work with async, run at delayed times
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// Import axios to make API Calls.
import axios from 'axios';
// Create a variable to store our base URL for requests
// 'http://localhost:3001/api/destinations';
const destURL = `${import.meta.env.VITE_API_URL}/destinations`;

// Set the initial state
const initialState = {
  // Stores the list of all destinations
  destinationList: [],
  // Stores one selected destination
  destination: {},
  // Tracks the status of our requests
  status: 'idle', // idle, loading, succeeded, failed.
  // stores errors
  errors: null,
  // store msgs
  message: null
}

// Create async thunk action functions.
// The way these functions are set up is as follows
// export const functionName = createAsyncThunk('action-name', async () => {})
// an action-name will generate one of 3 action types: pending, fulfilled, rejected

//*URLS MUST MATCH THE ROUTES IN THE SERVER
// Create/Add Destination
export const addNewDestination = createAsyncThunk('destination/AddNewDestination', async(newDestination) => {
  console.log('Adding new Destination: ', newDestination);
  try {
    const response = await axios.post(`${destURL}/add`, newDestination);
    return response.data;
  } catch (err) {
    return err.message;
  }
});


// Get All Destinations
export const fetchDestinationList = createAsyncThunk('destination/FetchDestinations', async() => { 
  console.log('Fetching destinations data...');
  try {
    const response  = await axios.get(destURL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// Get Destination by id or get single Destination.
export const getSingleDestination = createAsyncThunk('destination/getSingleDestination', async(id) => {
  console.log(`Getting single Destination, ${id}`);
  try {
    const response = await axios.get(`${destURL}/${id}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// Update Destination
export const updateDestination = createAsyncThunk('destination/updateDestination', async(destination) => {
  console.log(`Updating Destination id: ${destination.id}`);
  const id = destination.id;
  try {
    const response = await axios.put(`${destURL}/edit/${id}`, destination);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// Delete Destination
export const deleteDestination = createAsyncThunk(
  'destination/deleteDestination', 
  async({id}) => {
    console.log(`Deleting Destination with id ${id}`);
  
    try {
      const response = await axios.delete(`${destURL}/delete/${id}`);
      if (response.status === 204) {
        return id;
      }
      return `${response.status}: ${response.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);


// Create the slice and add in the reducer
// The createSlice function takes in a name, initial state and reducer functions.
// The slice will automatically generate the action creators and action types for the reducer and state.
// However we can set up our own action functions, using extraReducers and createAsyncThunk.
const destinationSlice = createSlice({
  name: 'Destination',
  initialState,
  reducers: {},
  // Create extraReducers.
  // extraReducers need a builder and we can allow cases for each outcome.
  // Like all reducers this will take in the state and an action.
  extraReducers: (builder) => {
    builder
      // fetchFeedbackList cases
      .addCase(fetchDestinationList.pending, (state, action) => {
        state.status = 'loading';
        state.message = 'loading';
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchDestinationList.fulfilled, (state, action) => {
        // Check what Redux receives from the API
        console.log("REDUX RECEIVED:", action.payload);
          // Update loading status
        state.status = 'succeeded';
          // Clear previous message
        state.message = null;
        state.destinationList = action.payload;
        state.currentRequestId = undefined;
        // Note: normally we would need to do this:
        // state.feedbackList = [...feedbackList, action.payload]
        // This is due to a library called immer.js
      })
      .addCase(fetchDestinationList.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message;
        state.errors = action.error.message;
      })
      //  Add feedback cases.
      .addCase(addNewDestination.fulfilled, (state, action) => {
        state.Destination = action.payload;
        state.message = null
        state.destinationList.push(action.payload);
      })
      // update feedback cases
      .addCase(updateDestination.fulfilled, (state, action) => {
        if(!action.payload){
          console.log('Update could not complete.')
          state.message = 'Update could not complete'
          return;
        }
        state.message = null
        console.log(action.payload.id);
        const list = state.destinationList.map(item => item.id === action.payload.id ?  action.payload : item);
        console.log(list);
        state.destination = action.payload;
        state.destinationList = list;
      })

      .addCase(deleteDestination.fulfilled, (state, action) => {
        if(!action.payload){
          console.log(`Delete could not complete`)
          console.log(action.payload);
          state.message = 'Delete could not complete'
          return;
        }
        state.message = null
        const id = action.payload;
        // create new destination list and filter out id
        const list = state.destinationList.filter(item => item.id !== id );
        // set the new list as our new destination's list
        state.destinationList = list;
      })


      .addCase(getSingleDestination.fulfilled, (state, action) => {
        state.message = null
        state.destination = action.payload;
      })
  } // End extra reducers
}); // end createSlice

// Export selectors
// selectors read data from redux
// We use selectors to access the state where we need to.
export const selectAllDestinations = state => state.destination.destinationList;
export const selectDestinationStatus = state => state.destination.status;
export const selectDestinationError = state => state.destination.errors;
export const selectSingleDestination = (state, id) => state.destination.destinationList.find(item => item.id === id);
export const selectDestinationMessage = state => state.destination.message;

// Export the reducer
export default destinationSlice.reducer;
