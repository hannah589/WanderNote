//Context Provider holds state and the API functions, that change the state
//import useState to store the destinations data list
import { useState } from "react";
//import the context define in DestinationContext.jsx
import { DestinationsContext } from "./DestinationsContext.jsx";
//import data from data file
//import { data } from "../data/data.js"
//axios sends HTTP request from web browser/node.js to server. Handles the api data
import axios from 'axios';


//Create the provider to pass the state and event functions down to the components that will use them. 
//This is done by wrapping the component tree/routes in the provider, in App.jsx.
export const DestinationsContextProvider = ({ children }) => {
  //create the state variable to hold the destinations list and functions to update it. The initial state is an empty db array. data in useState if, using a seed file
  const [destinationsList, setDestinationsList] = useState([]);

  //Create functions that will update the state, when call API 
  // CREATE/ADD new Destination
  const addDestination = async (newDestination) => {
    console.log('Add new destination - DestinationsContextProvider.jsx', newDestination);

    try {
      const res = await axios.post('http://localhost:3001/api/destinations/', newDestination);
      console.log('Destinations added:', res.data);
      //Add the new destination data to the current, existing list. spead operator ...array = copies the current array
      const newList = [ ...destinationsList,res.data];
      //set the new state
      setDestinationsList(newList)
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  // READ/GET all
  const getAllDestinations = async () => {
    console.log('GET all destinations - DestinationsContextProvider.jsx');

    try {
      //get req to hit get all api endpoint
      const res = await axios.get(
        'http://localhost:3001/api/destinations'
      );
      //log data to console
      console.log('Get all destinations from API:', res.data);
      //set and add all the data to the destinationList state
      setDestinationsList(res.data);
    } catch (error) {
      console.error('Error getting destinations:', error);
    }
  };

  // READ/GET by id
  const getDestinationById = async (id) => {
    console.log('getDestinationsById - DestinationsContextProvider.jsx');

    try {
      const res = await axios.get(
        `http://localhost:3001/api/destinations/${id}`
      );
      console.log('Get destination by ID:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error getting destination by id:', error);
    }
  };

  const getDestinationByName = async (name) => {
    console.log('getDestinationsByName - DestinationsContextProvider.jsx');

    try {
      const res = await axios.get(
        `http://localhost:3001/api/destinations/name/${name}`
      );
      console.log('Get destination by name:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error getting destination by name:', error);
    }
  };

  // UPDATE existing Destination
  const updateDestination = async (updatedDestination) => {
    console.log('updateDestination - DestinationContextProvider.jsx', updatedDestination);
    const id = Number(updatedDestination.id);

    try {
      const res = await axios.put(`http://localhost:3001/api/destinations/${id}`, updatedDestination);
      console.log('Destination updated:', res.data);

      // Update the Destination in state
      //set the destination list to the new upadted list
      //map function to create a new array with the updated data , if id dont match use and keep the current state value
      const newList = destinationsList.map((destination) => destination.id === id ? updatedDestination : destination)
      
      setDestinationsList(newList) 
    } catch (error) {
      console.error('Error updating Destination:', error);
    }
  };

  // DELETE Destination
  const deleteDestination = async (id) => {
    console.log('deleteDestination - DestinationContextProvider.jsx', id);

    try {
      //send request to api
      await axios.delete(`http://localhost:3001/api/destinations/${id}`);

      // Remove Destination from state using filter to create a new array without the the product that has the matching id
      const newList = destinationsList.filter((destination) => destination.id !== id);
      //set new state
      setDestinationsList(newList);
    } catch (error) {
      console.error('Error deleting Destination:', error);
    }
  };

  //create the return
  //this will return the provider that can access all value: state and function through DestinationContext 
  return (
    <DestinationsContext.Provider
      value={{
        destinationsList,
        addDestination,
        getAllDestinations,
        getDestinationById,
        getDestinationByName,
        updateDestination,
        deleteDestination,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};