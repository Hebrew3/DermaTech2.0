import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./client_hist.css";

const treatments = [
  { treatment: "Gluta Drip", aesthetician: "Marie", date: "12/12/2022" },
  { treatment: "Gluta Drip", aesthetician: "Xandra", date: "12/12/2022" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2022" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2022" }
];

export default function ClientHistory() {
  return (
    <div className="history-container">
      <h2>Client History</h2>

      <div className="client-info-row">
        <div className="client-info-box">
          <strong>Client Name:</strong> De Asis Daniel
        </div>
        <div className="client-info-box">
          <strong>Client ID:</strong> C2
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

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>History of Treatments</th>
              <th>Aesthetician</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((item, index) => (
              <tr key={index}>
                <td>{item.treatment}</td>
                <td>{item.aesthetician}</td>
                <td>{item.date}</td>
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

        <div className="pagination">
          <button className="page-btn" disabled>Previous</button>
          <span className="page-number">1</span>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}
