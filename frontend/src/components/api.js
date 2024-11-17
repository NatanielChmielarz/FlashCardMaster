import axios from "axios";
export const UpdateFlashCard = async(id,flashcard) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response =await axios.put(
      `https://flash-card-master-backend.vercel.app/notes/flashcard/${id}/`,
      flashcard,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    window.location.reload();
    return response.data;
    
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }


}
export const GetFlashCardDetails = async(id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    
    const response =await axios.get(
      `https://flash-card-master-backend.vercel.app/notes/flashcard/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }


}
export const DeleteFlashCard = async(id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
  
    await axios.delete(
      `https://flash-card-master-backend.vercel.app/notes/flashcard/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
      window.location.reload();
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }


}
export const CreateFlashCard = async (id, flashcard) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
  
    const response =await axios.post(
      `https://flash-card-master-backend.vercel.app/notes/${id}/flashcards`,
      flashcard,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }
};
export const fetchFlashCard = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
 
    const response =await axios.get(
      `https://flash-card-master-backend.vercel.app/notes/${id}/flashcards`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }
};
export const fetchNote = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`https://flash-card-master-backend.vercel.app/notes/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }
};
export const fetchData = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("https://flash-card-master-backend.vercel.app/notes/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
  }
};
export const updateNote = async (id, title, content) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await axios.put(
      `https://flash-card-master-backend.vercel.app/notes/${id}/`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Błąd aktualizacji danych:", error);
    throw error;
  }
};
export const deleteNote = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await axios.delete(
      `https://flash-card-master-backend.vercel.app/notes/${id}/`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Błąd aktualizacji danych:", error);
    throw error;
  }
};
export const createNote = async () => {
  const note = {
    title: "Nowa notatka",
    content: "Nowa notatka",
  };
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post("https://flash-card-master-backend.vercel.app/notes/", note, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Note created successfully:", response.data);
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

export const createEvent = async (eventData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      "https://flash-card-master-backend.vercel.app/events/",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEvents = async (filter) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    let url = 'https://flash-card-master-backend.vercel.app/events/';
    
    if (filter === 'active') {
      url += '?is_active=true';
    } else if (filter === 'completed') {
      url += '?is_active=false';
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.put(
      `https://flash-card-master-backend.vercel.app/events/${id}/`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
export const mark_as_completed = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      `https://flash-card-master-backend.vercel.app/events/${id}/mark_as_completed/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
export const deleteEvent = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await axios.delete(
      `https://flash-card-master-backend.vercel.app/events/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const sendPasswordReset = async (email) =>{
  try {
    const response = await axios.post(
      "https://flash-card-master-backend.vercel.app/account/password_reset/",
      {"email":email }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

export const resetPassword = async ( token, password) =>{
  try {
    const response = await axios.post(
      "https://flash-card-master-backend.vercel.app/account/password_reset/",
      { token, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}