import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <div className="app-container">
      <Header branding="WanderNote" /> 
      <main>
        <Outlet /> {/* Dynamic child pages render here */}
      </main>
      <Footer />
    </div>
  );
}