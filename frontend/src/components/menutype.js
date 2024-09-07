import React from "react";
import Question from "./Question";

function MenuType({ step }) {
  return (
    <Question
      step={step}
      question="어떤 종류의 음식을 선호하시나요?"
      options={["쌀", "면", "고기"]}
      nextPath="/price"
    />
  );
}

export default MenuType;
