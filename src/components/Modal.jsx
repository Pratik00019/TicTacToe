import React from "react";
import "./Modal.css"; // You can create a CSS file for modal styling

const Modal = ({ isVisible, onClose, message }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
