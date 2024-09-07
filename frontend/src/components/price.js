import React from "react";
import Question from "./Question";

function Price({ step }) {
  return (
    <Question
      step={step}
      question="어느 가격대를 선호하시나요?"
      options={["만원 이하", "만원 이상 2만원 이하", "2만원 이상"]}
      nextPath="/delivery"
    />
  );
}

export default Price;
