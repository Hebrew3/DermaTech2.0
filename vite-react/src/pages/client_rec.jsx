
import React from "react";
import { Pencil, Eye, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./client_rec.css";

const clients = [
  { id: "C1", lastName: "Bancoro", firstName: "Veronica", middleName: "Marasigan", age: 21, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C2", lastName: "De Asis", firstName: "Daniel", middleName: "May", age: 22, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C3", lastName: "Sinag", firstName: "Ace", middleName: "Did", age: 22, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C4", lastName: "Adiz", firstName: "George", middleName: "Gre", age: 21, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C5", lastName: "Bancoro", firstName: "Xandra", middleName: "Aquino", age: 20, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C6", lastName: "Hernandez", firstName: "Ara", middleName: "Lopez", age: 21, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C7", lastName: "Coro", firstName: "Rea", middleName: "Mora", age: 28, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C8", lastName: "Aclan", firstName: "John", middleName: "Aquino", age: 29, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" }
];

export default function ClientRecordsTable() {

  return (
    <div className="main-container">
      <div className="client-container">
        <div className="client-header">
          <h2>Client Records Table</h2>
          <button className="add-btn" title="Add Client"><Plus size={16} /></button>
        </div>

        <hr></hr>
        <div className="client-controls">
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
        
        <table className="client-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Contact No.</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.lastName}</td>
                <td>{client.firstName}</td>
                <td>{client.middleName}</td>
                <td>{client.gender}</td>
                <td>{client.age}</td>
                <td>{client.contact}</td>
                <td>{client.dateAdded}</td>
                <td className="action-icons">
                  <button className="icon-btn"><Pencil size={16} /></button>
                  <Link to="/client_hist" className="icon-btn">
                    <Eye size={16} />
                  </Link>
                  <button className="icon-btn" ><Trash2 size={16} /></button>
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
