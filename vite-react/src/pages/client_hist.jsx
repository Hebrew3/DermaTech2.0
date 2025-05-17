import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./client_hist.css";

const treatments = [
   { treatment: "Gluta Drip", aesthetician: "Marie", date: "12/12/2024", time: "10:00 AM" },
  { treatment: "Gluta Drip", aesthetician: "Xandra", date: "12/12/2024", time: "11:30 AM" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2024", time: "2:00 PM" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2024", time: "4:00 PM" }
];

export default function Client_hist() {
  return (

    <div className="main-container">
    <div className="history-container">
      <h2>Client History</h2>

       <hr></hr>

      <div className="client-info-row">
        <div className="client-info-box">
          <strong>Client Name:</strong> Bancoro Veronica M.
        </div>
        <div className="client-info-box">
          <strong>Client ID:</strong> C1
        </div>
      </div>

      <div className="filter-row">
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

    
      
        <table className="history-table">
          <thead>
            <tr>
              <th>History of Treatments</th>
              <th>Aesthetician</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((item, index) => (
              <tr key={index}>
                <td>{item.treatment}</td>
                <td>{item.aesthetician}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                  <button className="icon-btn" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div class="pagination">
            <button class="pagination-button">Previous</button>
            <span class="pagination-current">1</span>
            <button class="pagination-button">Next</button>
        </div>
      </div>
    </div>
    
  );
}