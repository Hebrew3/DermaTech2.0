// src/App.jsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlipCard from "./components/login";

import Client_rec from "./pages/client_rec";
import Client_hist from "./pages/client_hist";
import Inventory from "./pages/inventory";
import Appointment from "./pages/appoinment";

function Layout() {
  const location = useLocation();
  // Hide Navbar on all auth-related pages
  const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {!hideNavbar && <Navbar />}
      <div
        style={{
          flex: 1,
          marginLeft: hideNavbar ? 0 : "220px",
          padding: "1rem",
        }}
      >
        <Routes>
          {/* Public login/signup */}
          <Route path="/" element={<FlipCard />} />
          <Route path="/login" element={<FlipCard />} />
          <Route path="/signup" element={<FlipCard />} />

          {/* Protected routes */}
          <Route path="/client_rec" element={<Client_rec />} />
          <Route path="/client_hist/:id" element={<Client_hist />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;