// Price.js
import React from "react";
import Question from "./Question";

function Price({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="어느 가격대를 선호하시나요?"
      options={["1만원 이하", "2만원 이하", "상관 없음"]}
      nextPath="/delivery"
      handleAnswer={(answer) => {
        let price;
        if (answer === "1만원 이하") price = 10000;
        else if (answer === "2만원 이하") price = 20000;
        else if (answer === "상관 없음") price = 999999;
        handleAnswer("price", price);
      }}
    />
  );
}

export default Price;
