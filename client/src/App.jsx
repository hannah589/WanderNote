import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Favourites from "./pages/Favourites";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import SiteMap from "./pages/SiteMap";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadImage from "./pages/admin/UploadImage";
import ChangeImage from "./pages/admin/ChangeImage";
import UserAdminPage from "./pages/admin/UserAdmin/UserAdminPage";
import EditUser from "./pages/admin/UserAdmin/EditUser";
import DestAdminPage from "./pages/admin/DestAdmin/DestAdminPage";
import EditDestination from "./pages/destinations/EditDestination";

import { DestinationsProvider } from "./context/DestinationsProvider";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";
import { AdminProvider } from "./context/AdminProvider";

//context provider to manage state. wrap the context provider around the application, to allow children access to the context
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminProvider>
          <DestinationsProvider>
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
                <Route path="/register" element={<SignUp />} />
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/admin" element={<AdminDashboard />}>
                  {/* show default page when first visiting admin */}
                  <Route index element={<Navigate to="upload-image" replace />} />

                  <Route path="change-image" element={<ChangeImage />} />
                  <Route path="upload-image" element={<UploadImage />} />

                  <Route path="users" element={<UserAdminPage />} />
                  <Route path="users/edit/:id" element={<EditUser />} />

                  <Route path="dest-admin" element={<DestAdminPage />} />
                  <Route path="dest/edit/:id" element={<EditDestination />} />
                </Route>
              </Route>
            </Routes>
          </DestinationsProvider>
        </AdminProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
