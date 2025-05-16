import React from "react";
import { Pencil, Eye, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./client_rec.css";

const clients = [
  { id: "C1", lastName: "Bancoro", firstName: "Veronica", age: 21, contact: "09876543212", gender: "Female", date: "12/12/2022" },
  { id: "C2", lastName: "De Asis", firstName: "Daniel", age: 22, contact: "09876543212", gender: "Male", date: "12/12/2022" },
  { id: "C3", lastName: "Sinag", firstName: "Ace", age: 22, contact: "09876543212", gender: "Male", date: "12/12/2022" },
  { id: "C4", lastName: "Adiz", firstName: "George", age: 21, contact: "09876543212", gender: "Male", date: "12/12/2022" },
  { id: "C5", lastName: "Bancoro", firstName: "Xandra", age: 20, contact: "09876543212", gender: "Female", date: "12/12/2022" },
  { id: "C6", lastName: "Hernandez", firstName: "Ara", age: 21, contact: "09876543212", gender: "Female", date: "12/12/2022" },
  { id: "C7", lastName: "Coro", firstName: "Rea", age: 28, contact: "09876543212", gender: "Female", date: "12/12/2022" },
  { id: "C8", lastName: "Aclan", firstName: "John", age: 29, contact: "09876543212", gender: "Male", date: "12/12/2022" }
];

export default function Client_rec() {
  return (
    <main className="page-layout">
      <div className="container">
        <div className="table-wrapper">
          <div className="table-controls">
            <div className="title-row">
              <h2 className="title-with-icon">
                Client Records Table
                <button className="add-btn-icon" title="Add Client">
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
                  <input type="text" placeholder="" />
                </label>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Contact No.</th>
                <th>Gender</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.lastName}</td>
                  <td>{client.firstName}</td>
                  <td>{client.age}</td>
                  <td>{client.contact}</td>
                  <td>{client.gender}</td>
                  <td>{client.date}</td>
                  <td>
                    <button className="icon-btn"><Pencil size={16} /></button>
                    <Link to={`/client_hist/${client.id}`}>
                      <button className="icon-btn"><Eye size={16} /></button>
                    </Link>
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
