import React, { useState, useMemo } from "react";
import { Pencil, Eye, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./client_rec.css";

const initialClients = [
 
  { id: "C1", lastName: "Bancoro", firstName: "Veronica", middleName: "Marasigan", age: 21, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C2", lastName: "De Asis", firstName: "Daniel", middleName: "May", age: 22, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C3", lastName: "Sinag", firstName: "Ace", middleName: "Did", age: 22, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C4", lastName: "Adiz", firstName: "George", middleName: "Gre", age: 21, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C5", lastName: "Bancoro", firstName: "Xandra", middleName: "Aquino", age: 20, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C6", lastName: "Hernandez", firstName: "Ara", middleName: "Lopez", age: 21, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C7", lastName: "Coro", firstName: "Rea", middleName: "Mora", age: 28, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C8", lastName: "Aclan", firstName: "John", middleName: "Aquino", age: 29, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C9", lastName: "Bancoro", firstName: "Luna", middleName: "Martines", age: 29, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C10", lastName: "Sanchez", firstName: "Calix", middleName: "San Pedro", age: 29, contact: "09876543212", gender: "Male", dateAdded: "12/12/2024" },
  { id: "C11", lastName: "Velasco", firstName: "Elise", middleName: "Guirerro", age: 29, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" },
  { id: "C12", lastName: "Aclan", firstName: "Daniela", middleName: "Amora", age: 29, contact: "09876543212", gender: "Female", dateAdded: "12/12/2024" }

];

export default function ClientRecordsTable() {
  const [clientList, setClientList] = useState(initialClients);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const [newClient, setNewClient] = useState({
    id: "",
    lastName: "",
    firstName: "",
    middleName: "",
    age: "",
    contact: "",
    gender: "",
    dateAdded: new Date().toLocaleDateString(),
  });

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const id = `C${clientList.length + 1}`;
    setClientList([...clientList, { ...newClient, id }]);
    setNewClient({
      id: "",
      lastName: "",
      firstName: "",
      middleName: "",
      age: "",
      contact: "",
      gender: "",
      dateAdded: new Date().toLocaleDateString(),
    });
    setShowModal(false);
  };

  const filteredClients = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return clientList.filter((client) =>
      Object.values(client).some((val) =>
        String(val).toLowerCase().includes(lowerTerm)
      )
    );
  }, [searchTerm, clientList]);

  const totalPages = Math.ceil(filteredClients.length / entriesPerPage);

  const currentClients = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredClients.slice(start, start + entriesPerPage);
  }, [currentPage, entriesPerPage, filteredClients]);

  return (
    <div className="main-container">
      <div className="client-container">
        <div className="client-header">
          <h2>Client Records Table</h2>
          <button className="add" title="Add Client" onClick={() => setShowModal(true)}><Plus size={16} /></button>
        </div>

        <hr />
        <div className="client-controls">
          <div className="entries-control">
            <label>
              Show
              <select value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              entries
            </label>
          </div>
          <div className="search-control">
            <label>
              Search:
              <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
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
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
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
                    <button className="icon-btn" onClick={() => {
                      setClientToEdit(client);
                      setEditModalOpen(true);
                    }}>
                      <Pencil size={16} />
                    </button>

                   <Link to={`/client_hist/${client.id}`} className="icon-btn">
                      <Eye size={16} />
                    </Link>

                    <button className="icon-btn" onClick={() => {
                      setClientToDelete(client);
                      setDeleteModalOpen(true);
                    }}>
                      <Trash2 size={16} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Client</h3>
            <form onSubmit={handleAddClient} className="modal-form">
              <input name="lastName" placeholder="Last Name" value={newClient.lastName} onChange={handleInputChange} required />
              <input name="firstName" placeholder="First Name" value={newClient.firstName} onChange={handleInputChange} required />
              <input name="middleName" placeholder="Middle Name" value={newClient.middleName} onChange={handleInputChange} required />
              <select name="gender" value={newClient.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <input name="age" placeholder="Age" type="number" value={newClient.age} onChange={handleInputChange} required />
              <input name="contact" placeholder="Contact" value={newClient.contact} onChange={handleInputChange} required />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editModalOpen && clientToEdit && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Edit Client</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedClients = clients.map((c) =>
                    c.id === clientToEdit.id ? clientToEdit : c
                  );
                 
                  console.log("Updated client list:", updatedClients); 
                  setEditModalOpen(false);
                }}
                className="modal-form"
              >
                <input
                  name="lastName"
                  value={clientToEdit.lastName}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, lastName: e.target.value })}
                  required
                />
                <input
                  name="firstName"
                  value={clientToEdit.firstName}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, firstName: e.target.value })}
                  required
                />
                <input
                  name="middleName"
                  value={clientToEdit.middleName}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, middleName: e.target.value })}
                  required
                />
                <select
                  name="gender"
                  value={clientToEdit.gender}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, gender: e.target.value })}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <input
                  name="age"
                  type="number"
                  value={clientToEdit.age}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, age: e.target.value })}
                  required
                />
                <input
                  name="contact"
                  value={clientToEdit.contact}
                  onChange={(e) => setClientToEdit({ ...clientToEdit, contact: e.target.value })}
                  required
                />
                <div className="modal-actions">
                  <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteModalOpen && clientToDelete && (
            <div className="modal-backdrop">
              <div className="modal">
                <h3>Delete Client</h3>
                <p>Are you sure you want to delete <strong>{clientToDelete.firstName} {clientToDelete.lastName}</strong>?</p>
                <div className="modal-actions">
                  <button type="button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = clientsList.filter(c => c.id !== clientToDelete.id);
                      setClientsList(updated);
                      setDeleteModalOpen(false);
                    }}
                    style={{ backgroundColor: "#ef4444", color: "#fff" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}



    </div>
  );
}
