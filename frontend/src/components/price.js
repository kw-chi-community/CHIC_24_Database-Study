// Price.js
import React from "react";
import Question from "./Question";

function Price({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="어느 가격대를 선호하시나요?"
      options={["만원 이하", "만원 이상 2만원 이하", "2만원 이상"]}
      nextPath="/delivery"
      handleAnswer={(answer) => {
        let price;
        if (answer === "만원 이하") price = 0;
        else if (answer === "만원 이상 2만원 이하") price = 10000;
        else if (answer === "2만원 이상") price = 20000;
        handleAnswer("price", price);
      }}
    />
  );
}

export default Price;
