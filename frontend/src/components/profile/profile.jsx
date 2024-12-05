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
  const [error, setError] = useState({
    LoadFriendsError: "",
    SendInviteError: "",
    SendFriendRequestError: "",
    acceptFriendRequestError: "",
    rejectFriendRequestError: "",
    DeleteFriendError: "",
  });

  const handleErrors = (identifier, value) => {
    console.log(value)
    setError((prevData) => ({
      ...prevData,
      [identifier]: value || value || "Nieznany błąd",
    }));
  };

  const loadFriendsAndRequests = async () => {
    try {
      const friendList = await fetchFriendList();
      setFriends(friendList);
      const friendRequests = await fetchFriendRequests();
      setPendingInvites(friendRequests);
    } catch (error) {
      handleErrors("LoadFriendsError", error);
    }
  };

  useEffect(() => {
    loadFriendsAndRequests();
  }, []);

  const sendInvite = async (toUserMail) => {
    try {
      await createFriendRequest(toUserMail);
      loadFriendsAndRequests();
    } catch (error) {
      handleErrors("SendInviteError", error.response.data.to_user_email);
    }
  };

  const acceptInvite = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      loadFriendsAndRequests();
    } catch (error) {
      handleErrors("acceptFriendRequestError", error);
    }
  };

  const declineInvite = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      loadFriendsAndRequests();
    } catch (error) {
      handleErrors("rejectFriendRequestError", error);
    }
  };

  const removeFriend = async (friendId) => {
    try {
      console.log(friendId);
      await deleteFriend(friendId);
      loadFriendsAndRequests();
    } catch (error) {
      handleErrors("DeleteFriendError", error);
    }
  };

  return (
    <Layout>
      <div className="app">
        <header>
          <h1>Friend list</h1>
          <div className="HeaderElements">
            <NotificationBell
              pendingCount={pendingInvites.length}
              pendingInvites={pendingInvites}
              onAccept={acceptInvite}
              onDecline={declineInvite}
            />
            <button
              className="add-friend-button"
              onClick={() => setIsModalOpen(true)}
            >
              ➕
            </button>
            {isModalOpen && (
              <InviteModal
                onClose={() => {
                  setIsModalOpen(false);
                  handleErrors("SendInviteError", "");
                }}
                error={error.SendInviteError}
                onSendInvite={sendInvite}
              />
            )}
          </div>
        </header>
        <FriendList friends={friends} onRemoveFriend={removeFriend} />
        {error.LoadFriendsError && (
          <div className="error">{error.LoadFriendsError}</div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Profile);
