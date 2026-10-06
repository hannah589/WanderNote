//1. import createContext and useContext hooks from react 
import { createContext, useContext } from "react"

//2.create new context = using createContext()
//create containerName/s that hold our data and functions 
export const DestinationsContext = createContext();

//create custom hook to use the context in our component. 
//This allows us to access the context values without importing useContext in every component: import { useContext } from "react";
//hook always start with use
export function useDestinations(){
  //pass in the context created above
  return useContext(DestinationsContext);
};

//3.import DestinationsContext in DestinationsContextProvider