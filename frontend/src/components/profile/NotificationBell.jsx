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
          <h4>Zaproszenia do znajomych:</h4>
          <ul>
            {pendingInvites.length > 0 ? (
              pendingInvites.map((invite, index) => (
                <li key={index}>
                  {invite}
                  <button onClick={() => onAccept(invite)}>Akceptuj</button>
                  <button onClick={() => onDecline(invite)}>Odrzuć</button>
                </li>
              ))
            ) : (
              <p>Brak oczekujących zaproszeń.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
