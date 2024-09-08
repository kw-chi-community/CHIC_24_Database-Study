// Price.js
import React from "react";
import Question from "./Question";

function Price({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="가격은 어느정도 생각하나요?"
      options={["7천원 이하", "9천원 이하", "1만원 이하", "상관 없음"]}
      nextPath="/delivery"
      handleAnswer={(answer) => {
        let price;
        if (answer === "7천원 이하") price = 7000;
        else if (answer === "9천원 이하") price = 9000;
        else if (answer === "1만원 이하") price = 10000;
        else if (answer === "상관 없음") price = 999999;
        handleAnswer("price", price);
      }}
    />
  );
}

export default Price;
