import React, { useState, useEffect } from "react";
import {
  fetchFlashCard,
  DeleteFlashCard,
  UpdateFlashCard,
  GetFlashCardDetails,
} from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import "./flashcard.scss";
import Layout from "../layout/layout";
import withAuth from "../../withAuth";
const Flashcards = () => {
  const [flashcardsData, setFlashcardsData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFlashCard(id); // Pobierz dane flashcard
        setFlashcardsData(data); // Ustaw dane w stanie komponentu
        console.log(data); // Wyświetl dane flashcard w konsoli przeglądarki
      } catch (error) {
        console.error("Błąd pobierania danych flashcard:", error);
      }
    };

    fetchData(); // Wywołaj funkcję fetchData po zamontowaniu komponentu
  }, []);


  const handleDelete = async (id) => {
    try {
      await DeleteFlashCard(id);
      window.location.reload;
    } catch (error) {
      console.error("Błąd usuwania danych flashcard:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Layout>
       <div className="notes-bar">
              <h1>FlashCards</h1>
              <button onClick={()=>{navigate(`/notes/${id}`)}}>Back to notes</button>
              <div className="input-box">
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  onChange={handleSearchChange}
                  value={searchTerm}
                  placeholder="Search flashcards.."
                />
              </div>
            </div>
            {flashcardsData &&
                flashcardsData
                  .filter((item) =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((element) => (
                    <div key={element.id} className="flashcard-container">
                    <span className="flashcard-header">{element.title}</span>
                    <div className="flashcard-actions">
                      <button className="edit-button" onClick={handleShowModal}>
                        Edit
                      </button>
                      <div>
                        <Modal
                          show={showModal}
                          handleClose={handleCloseModal}
                          IsEditing={true}
                          handleSave={UpdateFlashCard}
                          NotesId={element.id}
                        />
                      </div>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(element.id)}
                      >
                        Delete
                      </button>
                    </div>
            
                  </div>
                  ))}
      
    </Layout>
  );
};

export default withAuth(Flashcards);
