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
        console.log(friendList)
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
      const newRequest = await createFriendRequest(toUserMail);  // Załóżmy, że createFriendRequest zwraca dane zaproszenia
      setPendingInvites((prev) => [...prev, newRequest]);  // Dodajemy pełne dane zaproszenia
    } catch (error) {
      console.error("Błąd wysyłania zaproszenia:", error);
    }
  };

  
  const acceptInvite = async (requestId) => {
    try {
      const acceptedRequest = await acceptFriendRequest(requestId);  // Akceptujemy zaproszenie i otrzymujemy dane zaproszenia
      setPendingInvites((prev) => prev.filter((invite) => invite.id !== requestId));  // Usuwamy zaproszenie z oczekujących
      setFriends((prev) => [...prev, acceptedRequest.from_user]);  // Dodajemy nowego znajomego do listy
    } catch (error) {
      console.error("Błąd akceptowania zaproszenia:", error);
    }
  };


  const declineInvite = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);  // Odrzucamy zaproszenie
      setPendingInvites((prev) => prev.filter((invite) => invite.id !== requestId));  // Usuwamy zaproszenie z oczekujących
    } catch (error) {
      console.error("Błąd odrzucania zaproszenia:", error);
    }
  };


  const removeFriend = async (friendId) => {
    try {
      await deleteFriend(friendId);  // Usuwamy znajomego
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));  // Usuwamy znajomego z listy
    } catch (error) {
      console.error("Błąd usuwania znajomego:", error);
    }
  };

  return (
    <Layout>
      <div className="app">
        <header>
          <h1>Lista znajomych</h1>
          <div className="HeaderElements">
          <NotificationBell
            pendingCount={pendingInvites.length}
            pendingInvites={pendingInvites}
            onAccept={acceptInvite}
            onDecline={declineInvite}
          />
          <button className="add-friend-button" onClick={() => setIsModalOpen(true)}>
          ➕ 
        </button>
        {isModalOpen && (
          <InviteModal
            onClose={() => setIsModalOpen(false)}
            onSendInvite={sendInvite}
          />
        )}</div>
        </header>
        <FriendList
          friends={friends}
          onRemoveFriend={removeFriend} // Funkcja usuwania znajomych
        />
        
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
