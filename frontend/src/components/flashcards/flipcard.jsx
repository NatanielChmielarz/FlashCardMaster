import React, { useState } from "react";

import "./flipcards.scss";

export default function FlipCard({data}) {
  const [flip, setFlip] = useState(false);
  const flipCard = () => {
    setFlip(!flip);
  };

  return (
    <div className={`flip-card ${flip != true ? "front-flip" : "back-flip"}` } onClick={flipCard} >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          
          
          <h1>{data.emoji}</h1>
            <h2>{data.question}</h2>
        </div>
        <div className="flip-card-back">
        <h1>{data.emoji}</h1>
            <h2>{data.answer}</h2>
         
        </div>
      </div>
     
      

          
      
    </div>
  );
}
