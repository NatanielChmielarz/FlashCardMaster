import React, { useState, useEffect } from "react";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
import FriendList from "./FriendList";
import NotificationBell from "./NotificationBell";
import InviteModal from "./InviteModal";
import "./profile.scss";
import {
  fetchFriendRequests,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  fetchFriendList,
  deleteFriend,
} from "../api.js";

const Profile = () => {
  const [friends, setFriends] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pobierz listę znajomych przy załadowaniu komponentu
  useEffect(() => {
    const loadFriendsAndRequests = async () => {
      try {
        const friendList = await fetchFriendList(); // Pobierz listę znajomych
        setFriends(friendList);

        const friendRequests = await fetchFriendRequests(); // Pobierz oczekujące zaproszenia
        setPendingInvites(friendRequests);
      } catch (error) {
        console.error("Błąd ładowania danych znajomych lub zaproszeń:", error);
      }
    };

    loadFriendsAndRequests();
  }, []);


  const sendInvite = async (toUserMail) => {
    try {
      await createFriendRequest(toUserMail);
      setPendingInvites((prev) => [...prev, { id: toUserMail }]);
    } catch (error) {
      console.error("Błąd wysyłania zaproszenia:", error);
    }
  };

  
  const acceptInvite = async (requestId) => {
    try {
      await acceptFriendRequest(requestId); 
      setPendingInvites((prev) => prev.filter((invite) => invite.id !== requestId));
      setFriends((prev) => [...prev, { id: requestId }]); 
    } catch (error) {
      console.error("Błąd akceptowania zaproszenia:", error);
    }
  };


  const declineInvite = async (requestId) => {
    try {
      await rejectFriendRequest(requestId); 
      setPendingInvites((prev) => prev.filter((invite) => invite.id !== requestId));
    } catch (error) {
      console.error("Błąd odrzucania zaproszenia:", error);
    }
  };


  const removeFriend = async (friendId) => {
    try {
      await deleteFriend(friendId); 
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId)); 
    } catch (error) {
      console.error("Błąd usuwania znajomego:", error);
    }
  };

  return (
    <Layout>
      <div className="app">
        <header>
          <h1>Lista znajomych</h1>
          <NotificationBell
            pendingCount={pendingInvites.length}
            pendingInvites={pendingInvites}
            onAccept={acceptInvite}
            onDecline={declineInvite}
          />
        </header>
        <FriendList
          friends={friends}
          onRemoveFriend={removeFriend} // Funkcja usuwania znajomych
        />
        <button className="add-friend-button" onClick={() => setIsModalOpen(true)}>
          ➕ Dodaj znajomego
        </button>
        {isModalOpen && (
          <InviteModal
            onClose={() => setIsModalOpen(false)}
            onSendInvite={sendInvite}
          />
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
