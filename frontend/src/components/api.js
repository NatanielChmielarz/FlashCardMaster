import axios from "axios";



const api = axios.create({
  baseURL: "https://flash-card-master-backend.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


// Notes
export const fetchNote = async (id) => {
  try {
    const response = await api.get(`/notes/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchData = async () => {
  try {
    const response = await api.get(`/notes/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
    throw error;
  }
};

export const updateNote = async (id, title, content) => {
  try {
    const response = await api.put(`/notes/${id}/`, { title, content });
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await api.delete(`/notes/${id}/`);
  } catch (error) {
    console.error("Error deleting note:", error.response?.data || error.message);
    throw error;
  }
};

export const createNote = async () => {
  try {
    const response = await api.post(`/notes/`, { title: "Nowa notatka", content: "Nowa notatka" });
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error.response?.data || error.message);
    throw error;
  }
};

// Flashcards
export const fetchFlashCards = async (id) => {
  try {
    const response = await api.get(`/notes/${id}/flashcards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error.response?.data || error.message);
    throw error;
  }
};

export const GetFlashCardDetails = async (id) => {
  try {
    const response = await api.get(`/notes/flashcard/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcard details:", error.response?.data || error.message);
    throw error;
  }
};

export const CreateFlashCard = async (id, flashcard) => {
  try {
    const response = await api.post(`/notes/${id}/flashcards`, flashcard);
    return response.data;
  } catch (error) {
    console.error("Error creating flashcard:", error.response?.data || error.message);
    throw error;
  }
};

export const UpdateFlashCard = async (id, flashcard) => {
  try {
    const response = await api.put(`/notes/flashcard/${id}/`, flashcard);
    return response.data;
  } catch (error) {
    console.error("Error updating flashcard:", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteFlashCard = async (id) => {
  try {
    await api.delete(`/notes/flashcard/${id}/`);
  } catch (error) {
    console.error("Error deleting flashcard:", error.response?.data || error.message);
    throw error;
  }
};

// Events
export const createEvent = async (eventData) => {
  try {
    const response = await api.post(`/events/`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};

export const getEvents = async (filter) => {
  try {
    let url = `/events/`;
    if (filter === "active") url += "?is_active=true";
    if (filter === "completed") url += "?is_active=false";

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error.message);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/events/${id}/`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.response?.data || error.message);
    throw error;
  }
};

export const markAsCompleted = async (id) => {
  try {
    const response = await api.post(`/events/${id}/mark_as_completed/`);
    return response.data;
  } catch (error) {
    console.error("Error marking event as completed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await api.delete(`/events/${id}/`);
  } catch (error) {
    console.error("Error deleting event:", error.response?.data || error.message);
    throw error;
  }
};

// Password Reset
export const sendPasswordReset = async (email) => {
  try {
    const response = await api.post(`/account/password_reset/`, { email });
    return response.data;
  } catch (error) {
    console.error("Error sending password reset email:", error.response?.data || error.message);
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/account/password_reset/`, { token, password });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error.response?.data || error.message);
    throw error;
  }
};

// Search
export const searchNoteByKeyword = async (keyword) => {
  try {
    const response = await api.get(`/notes/filter/`, { params: { keyword } });
    return response.data;
  } catch (error) {
    console.error("Error searching notes:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchFriendRequests = async () => {
  try {
    const response = await api.get(`account/friend-requests/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error.response?.data || error.message);
    throw error;
  }
};


export const createFriendRequest = async (toUserId) => {
  try {
    const response = await api.post(`account/friend-requests/`, { to_user: toUserId });
    return response.data;
  } catch (error) {
    console.error("Error creating friend request:", error.response?.data || error.message);
    throw error;
  }
};


export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await api.post(`account/friend-requests/${requestId}/accept/`);
    return response.data;
  } catch (error) {
    console.error("Error accepting friend request:", error.response?.data || error.message);
    throw error;
  }
};


export const rejectFriendRequest = async (requestId) => {
  try {
    const response = await api.delete(`account/friend-requests/${requestId}/reject/`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting friend request:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchFriendList = async () => {
  try {
    const response = await api.get(`account/friendships/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching friend list:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteFriend = async (friendshipId) => {
  try {
    await api.delete(`account/friendships/${friendshipId}/`);
    return { message: "Friendship deleted successfully." };
  } catch (error) {
    console.error("Error deleting friendship:", error.response?.data || error.message);
    throw error;
  }
};