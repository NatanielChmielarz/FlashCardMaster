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
    window.location.reload();
  } catch (error) {
    console.error("Error creating note:", error);
  }
};
