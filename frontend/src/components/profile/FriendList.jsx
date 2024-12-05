import React from "react";
import "./styles/FriendList.scss";

const FriendList = ({ friends,onRemoveFriend }) => {
  return (
    <div className="friend-list">
      <h3>Friends:</h3>
      <div >
      {friends.map((friend) => (
        <div key={friend.id} className="friend-item">
          <p>Username:{friend.friends_name.username} Email:{friend.friends_name.email}</p>
          <button onClick={()=>{onRemoveFriend(friend.id)}}>X</button> 
         
        </div>
      ))}
    </div>
    </div>
  );
};

export default FriendList;
