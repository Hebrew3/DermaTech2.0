import React from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import "./inventory.css";

const inventoryItems = [
  { id: "I1", name: "Facial Cleanser", quantity: 25, unit: "bottles", date: "01/05/2024" },
  { id: "I2", name: "Sunscreen SPF50", quantity: 8, unit: "tubes", date: "02/05/2024" },
  { id: "I3", name: "Acne Serum", quantity: 15, unit: "bottles", date: "03/05/2024" },
  { id: "I4", name: "Moisturizer", quantity: 5, unit: "jars", date: "04/05/2024" },
  { id: "I5", name: "Dermapen Needles", quantity: 50, unit: "pcs", date: "05/05/2024" }
];

export default function Inventory() {
  return (
    <main className="page-layout">
      <div className="container">
        <div className="table-wrapper">
          <div className="table-controls">
            <div className="title-row">
              <h2 className="title-with-icon">
                Inventory Table
                <button className="add-btn-icon" title="Add Inventory Item">
                  <Plus size={20} />
                </button>
              </h2>
            </div>

            <div className="filter-row">
              <div className="show-entries">
                <label>
                  Show
                  <select>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                  entries
                </label>
              </div>
              <div className="search-box">
                <label>
                  Search:
                  <input type="text" placeholder="Search items..." />
                </label>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.date}</td>
                  <td>
                    <button className="icon-btn"><Pencil size={16} /></button>
                    <button className="icon-btn"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="page-btn">Previous</button>
            <span className="page-number">1</span>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
