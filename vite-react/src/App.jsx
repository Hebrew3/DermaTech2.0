import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Client_rec from "./pages/client_rec";
import Client_hist from "./pages/client_hist";
import Inventory from "./pages/inventory";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ flex: 1, marginLeft: "220px", padding: "1rem" }}>
          <Routes>
            <Route path="/client_rec" element={<Client_rec />} />
            <Route path="/client_hist" element={<Client_hist />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
