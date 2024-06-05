import React, { useState, useEffect } from "react";
import "./challenge.scss";
import { fetchFlashCard } from "../api";
import FlipCard from "./flipcard";
import Layout from "../layout/layout";
import { useParams,useNavigate } from "react-router-dom";
import withAuth from "../../withAuth";
const Challenge = () => {
  const [isChallenge, setIsChallenge] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [clickCounter, setClickCounter] = useState(0);
  const [Summary, setSummary] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();
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
  }, [id]);

  const handleNextCard = (isCorrect) => {
    if (isCorrect) {
      setCorrectCounter(correctCounter + 1);
    }
    setClickCounter(clickCounter + 1);

    if (currentIndex < flashcardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsChallenge(false);
        setSummary(
        <div>
            <h1>Congratulations!</h1>
        <span>You got {correctCounter+1}/{ flashcardsData.length} correct answers</span>
        </div>)
    }
  };

  return (
    <Layout>
      {isChallenge ? (
        <div>
          <h1>Challenge</h1>
          <span>
            {currentIndex + 1}/{flashcardsData.length}
          </span>
          <div className="card-list">
            {flashcardsData.length > 0 && (
              <FlipCard key={currentIndex} data={flashcardsData[currentIndex]} />
            )}
            <div className="actionButtons">
              <button onClick={() => handleNextCard(true)}>I know</button>
              <button onClick={() => handleNextCard(false)}>I don't know</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ChallengeHeader">
            <h1>Challenge</h1>
            <p>
                Click button to start challenge with your added flashcards.
            </p>
            <p>
                Click the card to rotate and see the answer.
                If your answer is correct click i know rather click i dont know.
            </p>
        <button onClick={()=>{navigate(`/notes/${id}`)}}>Back to notes</button>
        <button onClick={() => {setIsChallenge(!isChallenge),setCurrentIndex(0),setSummary(null), setCorrectCounter(0),setClickCounter(0)}}>Start Challenge</button>
        {Summary}
        </div>
      )}
    </Layout>
  );
};

export default withAuth(Challenge);
