import React from "react";
import "./styles/FriendList.scss";

const FriendList = ({ friends }) => {
  return (
    <div className="friend-list">
      <h3>Znajomi:</h3>
      <ul>
        {friends.length > 0 ? (
          friends.map((friend, index) => <li key={index}>{friend}</li>)
        ) : (
          <p>Brak znajomych.</p>
        )}
      </ul>
    </div>
  );
};

export default FriendList;
