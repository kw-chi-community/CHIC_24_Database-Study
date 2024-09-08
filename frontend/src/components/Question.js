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
    <div>
      <h2>{step}번째 질문!</h2>
      <p>{question}</p>
      <div className="buttons-box">
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
    </div>
  );
}

export default Question;
