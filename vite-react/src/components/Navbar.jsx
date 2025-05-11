import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ClipboardList,
  CalendarDays,
  FileText,
  File,
  Users,
  LineChart
} from "lucide-react";
import "./Navbar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <img src="/kdermalogo.png" alt="Derma Logo" className="logo" />
      <nav className="nav-menu">
        <Link to="/dashboard" className="nav-item">
          <Home className="icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/client_rec" className="nav-item">
          <ClipboardList className="icon" />
          <span>Client Records Table</span>
        </Link>
        <Link to="/schedule" className="nav-item">
          <CalendarDays className="icon" />
          <span>Schedule</span>
        </Link>
        <Link to="/appointments" className="nav-item">
          <FileText className="icon" />
          <span>Appointment Details</span>
        </Link>
        <Link to="/inventory" className="nav-item">
          <File className="icon" />
          <span>Inventory</span>
        </Link>
        <Link to="/treatments" className="nav-item">
          <Users className="icon" />
          <span>Trend Treatments</span>
        </Link>
        <Link to="/forecasting" className="nav-item">
          <LineChart className="icon" />
          <span>Forecasting</span>
        </Link>
      </nav>
    </div>
  );
}
