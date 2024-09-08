// MenuType.js
import React from "react";
import Question from "./Question";

function MenuType({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="어떤 종류의 음식을 선호하시나요?"
      options={["밥", "면", "고기", "기타"]}
      nextPath="/price"
      handleAnswer={(answer) => handleAnswer("menu_type", answer)}
    />
  );
}

export default MenuType;
