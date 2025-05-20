import React, { useState } from "react";
import Swal from "sweetalert2";
import "./inventory.css";

const Inventory = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Hyaluronic Acid Serum", quantity: 20, price: 10 },
    { id: 2, name: "Peptide Firming Serum", quantity: 15, price: 12 },
    { id: 3, name: "Vitamin C Face Cream", quantity: 10, price: 8 },
    { id: 4, name: "Gentle Cleansing Gel", quantity: 8, price: 15 },
    { id: 5, name: "SPF 50 Daily Protection", quantity: 25, price: 5 },
    { id: 6, name: "Niacinamide Serum", quantity: 18, price: 7 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: msg,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      position: "center",
      toast: false,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter((item) => item.id !== id));
        showSuccess("Item has been deleted.");
        const newTotalPages = Math.ceil((items.length - 1) / itemsPerPage);
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
      }
    });
  };

  const getStatus = (qty) => {
    if (qty === 0) return { label: "Out of stock", className: "status-out" };
    if (qty < 5) return { label: "Low stock", className: "status-low" };
    return { label: "In-stock", className: "status-in" };
  };

  return (
    <div className="dashboard-container">
      <h2>Inventory Management</h2>
      <div className="dashboard-header">
        <div className="card">
          <p>Products</p>
          <h3>14</h3>
        </div>
        <div className="card">
          <p>Total Stocks</p>
          <h3>74</h3>
        </div>
        <div className="card">
          <p>Low Stock</p>
          <h3>5</h3>
        </div>
        <div className="card">
          <p>Used Stock</p>
          <h3>5</h3>
        </div>
      </div>

      <div className="search-add">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div>
          <button className="btn">Add New Product</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => {
                const status = getStatus(item.quantity);
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className={status.className}>{status.label}</td>
                    <td className="action-icons">
                      
                      <button className="icon-btn" title="Edit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                          />
                        </svg>
                      </button>
                      <button
                        className="icon-btn"
                        title="Delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7L5 7M10 11v6m4-6v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-items">
                  No items found.
                </td>
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
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
