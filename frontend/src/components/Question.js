import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function QuestionComponent({ step, question, options, nextPath }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(nextPath);
  };

  return (
    <div className="main-component">
      <h1>{step}번째 질문!</h1>
      <p>{question}</p>
      {options.map((option, index) => (
        <button key={index} onClick={handleClick}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionComponent;
