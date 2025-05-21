import React, { useState, useMemo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import "./appoinment.css";

const initialAppointments = [
  { id: "A1", clientName: "Veronica Bancoro", treatment: "Facial", date: "2025-05-20", aesthetician: "Anna" },
  { id: "A2", clientName: "Daniel De Asis", treatment: "Massage", date: "2025-05-21", aesthetician: "Maria" },
  { id: "A3", clientName: "Ace Sinag", treatment: "Waxing", date: "2025-05-22", aesthetician: "Jane" },
  { id: "A4", clientName: "Xandra Bancoro", treatment: "Hair Treatment", date: "2025-05-23", aesthetician: "Sophia" },
  { id: "A5", clientName: "Nicole Ramos", treatment: "Body Scrub", date: "2025-05-24", aesthetician: "Tina" },
  { id: "A6", clientName: "Mark Reyes", treatment: "Facial", date: "2025-05-25", aesthetician: "Anna" },
  { id: "A7", clientName: "Client 7", treatment: "Massage", date: "2025-05-26", aesthetician: "Jane" },
  { id: "A8", clientName: "Client 8", treatment: "Facial", date: "2025-05-27", aesthetician: "Tina" },
  { id: "A9", clientName: "Client 9", treatment: "Body Scrub", date: "2025-05-28", aesthetician: "Maria" },
  { id: "A10", clientName: "Client 10", treatment: "Hair Treatment", date: "2025-05-29", aesthetician: "Sophia" },
  { id: "A11", clientName: "Client 11", treatment: "Waxing", date: "2025-05-30", aesthetician: "Anna" },
  { id: "A12", clientName: "Client 12", treatment: "Facial", date: "2025-05-31", aesthetician: "Maria" },
];

export default function Appointment() {
  const [appointmentData, setAppointmentData] = useState([...initialAppointments]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editData, setEditData] = useState({});
  const [newData, setNewData] = useState({ clientName: "", treatment: "", date: "", aesthetician: "" });

  const today = new Date().toISOString().split("T")[0];

  const filteredAppointments = useMemo(() => {
    return appointmentData.filter((a) =>
      Object.values(a).some((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, appointmentData]);

  const totalPages = Math.ceil(filteredAppointments.length / entriesPerPage);
  const currentAppointments = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredAppointments.slice(start, start + entriesPerPage);
  }, [filteredAppointments, currentPage, entriesPerPage]);

  const handleEditClick = (appointment) => {
    setEditData(appointment);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setAppointmentData(prev =>
      prev.map(item => item.id === editData.id ? editData : item)
    );
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setAppointmentData(prev =>
      prev.filter(item => item.id !== selectedAppointment.id)
    );
    setDeleteModalOpen(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSave = (e) => {
    e.preventDefault();
    const newId = `A${appointmentData.length + 1}`;
    setAppointmentData(prev => [...prev, { id: newId, ...newData }]);
    setNewData({ clientName: "", treatment: "", date: "", aesthetician: "" });
    setAddModalOpen(false);
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <div className="appointment-header">
          <h2>Appointments</h2>
          <button className="add-btn" title="Add Appointment" onClick={() => setAddModalOpen(true)}>
            <Plus size={16} />
          </button>
        </div>

        <hr />

        <div className="appointment-controls">
          <div className="entries-control">
            <label>
              Show
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
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
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search"
              />
            </label>
          </div>
        </div>

        <div className="table-wrapper">
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
              {currentAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.clientName}</td>
                  <td>{appointment.treatment}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.aesthetician}</td>
                  <td className="action-icons">
                    <button className="icon-btn" onClick={() => handleEditClick(appointment)}><Pencil size={16} /></button>
                    <button className="icon-btn" onClick={() => handleDeleteClick(appointment)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {currentAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-current">{currentPage}</span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Appointment</h3>
            <form className="modal-form" onSubmit={handleEditSave}>
              <input
                type="text"
                name="clientName"
                value={editData.clientName}
                readOnly
                placeholder="Client Name"
              />
              <input
                type="text"
                name="treatment"
                value={editData.treatment}
                onChange={handleEditChange}
                placeholder="Treatment"
              />
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleEditChange}
                min={today}
              />
              <input
                type="text"
                name="aesthetician"
                value={editData.aesthetician}
                onChange={handleEditChange}
                placeholder="Aesthetician"
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="modal-actions">
              <button type="button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button type="button" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Appointment</h3>
            <form className="modal-form" onSubmit={handleAddSave}>
              <input
                type="text"
                name="clientName"
                value={newData.clientName}
                onChange={handleAddChange}
                placeholder="Client Name"
                required
              />
              <input
                type="text"
                name="treatment"
                value={newData.treatment}
                onChange={handleAddChange}
                placeholder="Treatment"
                required
              />
              <input
                type="date"
                name="date"
                value={newData.date}
                onChange={handleAddChange}
                min={today}
                required
              />
              <input
                type="text"
                name="aesthetician"
                value={newData.aesthetician}
                onChange={handleAddChange}
                placeholder="Aesthetician"
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setAddModalOpen(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
