// Distance.js
import React from "react";
import Question from "./Question";

function Distance({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="시계탑 기준으로, 걸어서 몇 분까지 괜찮나요?"
      options={["15분", "10분", "5분", "상관 없음"]}
      nextPath="/manypeople"
      handleAnswer={(answer) => {
        let distance;
        if (answer === "15분") distance = 1000;
        else if (answer === "10분") distance = 600;
        else if (answer === "5분") distance = 300;
        else if (answer === "상관 없음") distance = 999999;
        handleAnswer("distance", distance);
      }}
    />
  );
}

export default Distance;
