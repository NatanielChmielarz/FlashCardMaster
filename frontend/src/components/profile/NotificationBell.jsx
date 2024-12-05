import React, { useState } from "react";
import "./styles/NotificationBell.scss";

const NotificationBell = ({ pendingCount, pendingInvites, onAccept, onDecline }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="notification-bell">
      <div className="bell" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        🔔
        {pendingCount > 0 && <span className="count">{pendingCount}</span>}
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <h4>Friend requests::</h4>
          <ul>
            {pendingInvites.length > 0 ? (
              pendingInvites.map((invite) => (
                <li key={invite.id}>
                  {invite.from_user_email }
                  <button onClick={() => onAccept(invite.id)}>Akceptuj</button>
                  <button onClick={() => onDecline(invite.id)}>Odrzuć</button>
                </li>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
