import React, { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./client_hist.css"; 

const treatments = [
  { treatment: "Gluta Drip", aesthetician: "Marie", date: "12/12/2024", time: "10:00 AM" },
  { treatment: "Gluta Drip", aesthetician: "Xandra", date: "12/12/2024", time: "11:30 AM" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2024", time: "2:00 PM" },
  { treatment: "Acne Facial", aesthetician: "Jessie", date: "12/12/2024", time: "4:00 PM" },
];

export default function Client_hist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [editData, setEditData] = useState({});

  const totalPages = Math.ceil(treatments.length / entriesPerPage);

  const currentTreatments = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return treatments.slice(start, start + entriesPerPage);
  }, [currentPage, entriesPerPage]);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEditClick = (treatment) => {
    setEditData(treatment);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (treatment) => {
    setSelectedTreatment(treatment);
    setDeleteModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    console.log("Edited Data:", editData);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted:", selectedTreatment);
    setDeleteModalOpen(false);
  };

  return (
    <div className="main-container">
      <div className="history-container">
        <h2>Client History</h2>
        <hr />

        <div className="client-info-row">
          <div className="client-info-box"><strong>Client Name:</strong></div>
          <div className="client-info-box"><strong>Client ID:</strong></div>
        </div>

        <div className="filter-row">
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
            {currentTreatments.length > 0 ? (
              currentTreatments.map((item, index) => (
                <tr key={index}>
                  <td>{item.treatment}</td>
                  <td>{item.aesthetician}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <button className="icon-btn" onClick={() => handleEditClick(item)}>
                      <Pencil size={16} />
                    </button>
                    <button className="icon-btn" onClick={() => handleDeleteClick(item)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5}>No treatments available.</td></tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages || 1}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
        </div>
      </div>

      {editModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Treatment</h3>
            <form className="modal-form" onSubmit={handleEditSave}>
              <input type="text" name="treatment" value={editData.treatment} onChange={handleEditChange} placeholder="Treatment" />
              <input type="text" name="aesthetician" value={editData.aesthetician} onChange={handleEditChange} placeholder="Aesthetician" />
              <input type="date" name="date" value={editData.date} onChange={handleEditChange} />
              <input type="time" name="time" value={editData.time} onChange={handleEditChange} />
              <div className="modal-actions">
                <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this treatment?</p>
            <div className="modal-actions">
              <button type="button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button type="delete" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
