import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Question({
  step,
  question,
  options,
  nextPath,
  nextPaths,
  handleAnswer,
}) {
  const navigate = useNavigate();

  const handleClick = (option, path) => {
    handleAnswer(option);
    navigate(path);
  };

  return (
    <div className="main-component">
      <h1>{step}번째 질문!</h1>
      <p>{question}</p>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() =>
            handleClick(option, nextPaths ? nextPaths[index] : nextPath)
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Question;
