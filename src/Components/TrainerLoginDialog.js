import React from 'react';
import './TrainerLoginDialog.css'; // Ensure this file contains the updated styles

const TrainerLoginDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-dialog-overlay">
      <div className="login-dialog-content">
        <h2>Trainer Login Required</h2>
        <p>You need to be logged in as a trainer to access this feature.</p>
        <div className="login-dialog-buttons">
          <button className="login-dialog-close" onClick={onClose}>Close</button>
          <button className="login-dialog-login" onClick={() => window.location.href = '/trainer-login'}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerLoginDialog;
