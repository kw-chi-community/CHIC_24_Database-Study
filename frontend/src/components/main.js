import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../Buttons.css";

function Main({ resetStep }) {
  const navigate = useNavigate();

  const handleClick = () => {
    resetStep();
    navigate("/ismeal");
  };

  return (
    <div>
      <h2>광운대 맛집 테스트</h2>
      <p>배는 고픈데 갈만한 곳이 생각나지 않는다면?</p>
      <p>학교 주변 맛집을 추천해드릴게요!</p>
      <button className="start-button" onClick={handleClick}>
        시작하기
      </button>
    </div>
  );
}

export default Main;
