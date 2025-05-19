import React from "react";
import { Pencil, Eye, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./appoinment.css";

const appointments = [
  { id: "A1", clientName: "Veronica Bancoro", treatment: "Facial", date: "2025-05-20", aesthetician: "Anna" },
  { id: "A2", clientName: "Daniel De Asis", treatment: "Massage", date: "2025-05-21", aesthetician: "Maria" },
  { id: "A3", clientName: "Ace Sinag", treatment: "Waxing", date: "2025-05-22", aesthetician: "Jane" },
  { id: "A4", clientName: "Xandra Bancoro", treatment: "Hair Treatment", date: "2025-05-23", aesthetician: "Sophia" },
];

export default function Appointment() {
  return (
    <div className="main-container">
      <div className="appointment-container">
        <div className="appointment-header">
          <h2>Appointments</h2>
          <button className="add-btn" title="Add Appointment"><Plus size={16} /></button>
        </div>

        <hr />

        <div className="appointment-controls">
          <div className="entries-control">
            <label>
              Show
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              entries
            </label>
          </div>
          <div className="search-control">
            <label>
              Search:
              <input type="text" placeholder="" />
            </label>
          </div>
        </div>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Client Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Aesthetician</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.clientName}</td>
                <td>{appointment.treatment}</td>
                <td>{appointment.date}</td>
                <td>{appointment.aesthetician}</td>
                <td className="action-icons">
                  <button className="icon-btn"><Pencil size={16} /></button>
                  <Link to={`/appointment/${appointment.id}`} className="icon-btn">
                    <Eye size={16} />
                  </Link>
                  <button className="icon-btn"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="pagination-button">Previous</button>
          <span className="pagination-current">1</span>
          <button className="pagination-button">Next</button>
        </div>
      </div>
    </div>
  );
}
