import "./flashcard.scss"
import React, { useState } from 'react';
import Modal from '../modal/modal';
import { CreateFlashCard} from '../api'
import { useNavigate } from "react-router-dom";
const flashcardmenu = ({color,id,flashcards})=>{
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();;
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
 
    return (
        <div className="Flashcard_menu">
        <h1>Flashcard Menu</h1>
        <p>Ilość fiszek w tej lekcji : {flashcards ? flashcards : "0"}</p>
        <button className="button" style={{"backgroundColor":color?color:""}} onClick={()=>{navigate(`/notes/${id}/FlashcardChallenge`)}}> Wyzwanie fiszek</button>
        <div>
      <button className="button" style={{"backgroundColor":color?color:""}} onClick={handleShowModal}>Dodaj fiszke</button>
      <Modal show={showModal} handleClose={handleCloseModal} handleSave={CreateFlashCard} NotesId={id} IsEditing={true} />
    </div>
        <button className="button" style={{"backgroundColor":color?color:""}} onClick={()=>{navigate(`/notes/${id}/Flashcards`)}}>Edytuj fiszki</button>
        </div>
    )

}

export default flashcardmenu;