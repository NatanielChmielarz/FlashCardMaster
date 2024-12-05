import React, { useState } from "react";
import "./styles/InviteModal.scss";
import { createFriendRequest } from "../api";
const InviteModal = ({ onClose, onSendInvite ,error}) => {
  const [inviteName, setInviteName] = useState("");
  
  
  const handleSend =  () => {
    response = onSendInvite(inviteName);
    setInviteName("");
    onClose();
  };

  return (
    <div className="invite-modal">
      <div className="modal-content">
        <h3>Send friend request.</h3>
        <input
          type="text"
          value={inviteName}
          onChange={(e) => setInviteName(e.target.value)}
          placeholder="Email"
        />
        <div className="modal-buttons">
          <button onClick={handleSend}>Send</button>
          <button onClick={onClose}>Cancel</button>
        </div><p className="Errors">{error}</p>
      </div>
      
    </div>
  );
};

export default InviteModal;
