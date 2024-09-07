import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Main() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ismeal");
  };

  return (
    <div className="main-component">
      <h1>광운대 맛집 테스트</h1>
      <p>나와 딱 맞는 광운대 맛집은 어디일까?</p>
      <button onClick={handleClick}>시작하기</button>
    </div>
  );
}

export default Main;
