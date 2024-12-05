import React, { useState } from "react";
import "./styles/InviteModal.scss";
import { createFriendRequest } from "../api";
const InviteModal = ({ onClose, onSendInvite }) => {
  const [inviteName, setInviteName] = useState("");
  const [error,setError] = useState("")
  const handleSend = () => {
    if (inviteName.trim() === "") {
      alert("Proszę wpisać imię i nazwisko.");
      return;
    }
    onSendInvite(inviteName);
    setInviteName("");
    onClose();
  };

  return (
    <div className="invite-modal">
      <div className="modal-content">
        <h3>Wyślij zaproszenie</h3>
        <input
          type="text"
          value={inviteName}
          onChange={(e) => setInviteName(e.target.value)}
          placeholder="Email"
        />
        <div className="modal-buttons">
          <button onClick={handleSend}>Wyślij</button>
          <button onClick={onClose}>Anuluj</button>
        </div>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default InviteModal;
