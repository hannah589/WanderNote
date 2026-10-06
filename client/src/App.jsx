import { Routes, Route } from "react-router-dom";
//import { AuthContextProvider } from "./contexts/AuthContextProvider";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Favourites from "./pages/Favourites"; 
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import SiteMap from "./pages/SiteMap";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AddDestination from "./pages/destinations/AddDestination";
import EditDestination from "./pages/destinations/EditDestination";

//context provider to manage state. wrap the context provider around the application, to allow children access to the context
function App() {
  return (
    //<AuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/destinations" element={<Destinations />} />
          <Route
            path="/destinations/:id"
            element={<DestinationDetails />}
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="*" element={<NotFound />} />

          {/* remember to protect route */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path='add-destination' element={<AddDestination/>} />
          <Route path='edit/:id' element={<EditDestination />} />

        </Route>
      </Routes>
  //</AuthContextProvider>
  );
}

export default App;
