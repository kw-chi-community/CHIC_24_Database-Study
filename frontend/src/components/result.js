import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Result({ answers, resetStep }) {
  const navigate = useNavigate();

  const handleClick = () => {
    resetStep();
    navigate("/");
  };

  return (
    <div className="main-component">
      <h1>나에게 맞는 광운대 맛집은...</h1>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
      <button onClick={handleClick}>다시하기</button>
    </div>
  );
}

export default Result;
