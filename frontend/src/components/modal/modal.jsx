import React, { useState, useEffect } from "react";
import "./modal.scss";
import EmojiPicker from "emoji-picker-react";
import { GetFlashCardDetails } from "../api";
import Picker from "emoji-picker-react";
const Modal = ({ show, handleClose, handleSave, NotesId, IsEditing }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (IsEditing) {
      const fetchData = async () => {
        try {
          const data = await GetFlashCardDetails(NotesId);
          setInput1(data.question);
          setInput2(data.answer);
          setInput3(data.title);
          setInputStr(data.emoji);
        } catch (error) {
          console.error("Błąd pobierania danych:", error);
        }
      };

      fetchData();
    }
  }, [IsEditing, NotesId]);
  const data = {
    title: input3,
    question: input1,
    answer: input2,
    emoji: inputStr,
  };

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };
  const handleInput3Change = (e) => {
    setInput3(e.target.value);
  };

  const onSave = () => {
    if (input1 && input2 && input3) {
      handleSave(NotesId, data);
      console.log(input1, input2, inputStr);
      handleClose();
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h1>{IsEditing ? "Edit flashcard" : "Create flashcard"}</h1>
        <div className="picker-container">
          <span className="emoji-label">Emoji: {inputStr}</span>
          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            alt="Emoji Icon"
            onClick={() => setShowPicker((val) => !val)}
          />
          {showPicker && (
            <div className="picker-wrapper">
              <Picker
                width="100%"
                onEmojiClick={(emojiObject) => setInputStr(emojiObject.emoji)}
              />
            </div>
          )}
        </div>

        <input
          className="input"
          type="text"
          placeholder="Question"
          value={input1}
          onChange={handleInput1Change}
          required={true}
        />
        <input
          className="input"
          type="text"
          placeholder="Answer"
          value={input2}
          onChange={handleInput2Change}
          required={true}
        />
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={input3}
          onChange={handleInput3Change}
          required={true}
        />
        <button className="button" onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
