import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Result({ resetStep }) {
  const restaurant_name = "test_name";
  const signature_menu = "test_menu";

  const navigate = useNavigate();

  const handleClick = () => {
    resetStep();
    navigate("/");
  };

  return (
    <div className="main-component">
      <h1>나에게 맞는 광운대 맛집은...</h1>
      <h3>{restaurant_name}</h3>
      <p>{signature_menu}</p>
      <button onClick={handleClick}>다시하기</button>
    </div>
  );
}

export default Result;
