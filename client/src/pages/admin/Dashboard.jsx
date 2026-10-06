import { useContext, useEffect } from "react";
import { DestinationsContext } from "../../contexts/DestinationsContext";


function AdminDashboard() {
  //get all destinations from useContext 
  const {destinationsList, getAllDestinations, addDestination, updateDestination } = useContext(DestinationsContext);

  //get all destinations, when page mounts
  useEffect(() => {
    getAllDestinations();
  }, []);
  

  return (
    <>
      <h1>Admin Dashboard</h1>
      
    </>
  )
}

export default AdminDashboard
