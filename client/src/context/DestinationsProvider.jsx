//Context Provider holds state and the API functions, that change the state
//import useState to store the destinations data list
import { useState } from "react";
//import the context define in DestinationContext.jsx
import { DestinationsContext } from "./DestinationsContext.jsx";
//import data from data file
//import { data } from "../data/data.js"
//axios sends HTTP request from web browser/node.js to server. Handles the api data
import axios from 'axios';

const destURL = `${import.meta.env.VITE_API_URL}/destinations`;

//Create the provider to pass the state and event functions down to the components that will use them. 
//This is done by wrapping the component tree/routes in the provider, in App.jsx.
export const DestinationsProvider = ({ children }) => {
  //create the state variable to hold the destinations list and functions to update it. The initial state is an empty db array. data in useState if, using a seed file
  const [destinationsList, setDestinationsList] = useState([]);

  //Create functions that will update the state, when call API 
  // CREATE/ADD new Destination
  const addDestination = async (newDestination) => {
    console.log('Add new destination - DestinationsContextProvider.jsx', newDestination);

    try {
      const res = await axios.post(`${destURL}/add`, newDestination);

      console.log('CONTEXT - Add Destination:', res.data);
      //Add the new destination data to the current, existing list. use the spread operator ...array = copies the current array
      //set the new state
      setDestinationsList((prevList) => [...prevList, res.data]);
      return res.data;
    } catch (error) {
      console.error('Error adding destination:', error);
      throw error;
    }
  };

  // READ/GET all
  const getAllDestinations = async () => {
    console.log('GET all destinations - DestinationsProvider.jsx');

    try {
      //get req to hit get all api endpoint
      const res = await axios.get(destURL);
      //log data to console
      console.log('Get all destinations:', res.data);
      //set and add all the data to the destinationList state
      setDestinationsList(res.data);
      return res.data
    } catch (error) {
      console.error('Error getting all destinations:', error);
      throw error;
    }
  };

  // READ/GET by id
  const getDestinationById = async (id) => {
    console.log('getDestinationsById - DestinationsProvider.jsx');

    try {
      const res = await axios.get(
        `${destURL}/add/${id}`
      );
      console.log('Get destination by ID:', res.data);

      return res.data;
    } catch (error) {
      console.error('Error getting destination by id:', error);
      throw error;
    }
  };

  const getDestinationByName = async (name) => {
    console.log('getDestinationsByName - DestinationsContextProvider.jsx');

    try {
      //encodeURIComponent, to contain spaces in the url
      const res = await axios.get(
        `${destURL}/name/${encodeURIComponent(name)}`
      );
      console.log('Get destination by name:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error getting destination by name:', error);
      throw error;
    }
  };

  // UPDATE existing Destination
  const updateDestination = async (updatedDestination) => {
    console.log('updateDestination - DestinationProvider.jsx', updatedDestination);
    const id = Number(updatedDestination.id);

    try {
      const res = await axios.put(`${destURL}/edit/${id}`, updatedDestination);
      console.log('Destination updated:', res.data);

      // Update the Destination in state
      //set the destination list to the new upadted list
      //map function to create a new array with the updated data , if id dont match use and keep the current state value
      // Update destination in the list
      setDestinationsList((prevList) =>
        prevList.map((destination) =>
          Number(destination.id) === id ? res.data : destination
        )
      );

      return res.data;
    } catch (error) {
      console.error('Error updating Destination:', error);
      throw error;
    }
  };

  // DELETE Destination
  const deleteDestination = async (id) => {
    id = Number(id);
    console.log('deleteDestination - DestinationContextProvider.jsx', id);

    try {
      //send request to api
      await axios.delete(`${destURL}/delete/${id}`);

      // Remove Destination from state using filter to create a new array without the the product that has the matching id
      setDestinationsList((prevList) =>
        prevList.filter((destination) => destination.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete destination:', error);
      throw error;
    }
  };

  // Search Destination
  const searchDestinations = async (destination) => {
    console.log('searchDestination - DestinationContextProvider.jsx', destination);

    try {
      //send request to api
      const res = await axios.get(`${destURL}/search/${encodeURIComponent(destination)}`);
      console.log("Search results:", res.data);
      return res.data;
    } catch (error) {
      console.error('Error searching Destination:', error);
      throw error;
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
        searchDestinations,
      }}>
      {children}
    </DestinationsContext.Provider>
  );
};