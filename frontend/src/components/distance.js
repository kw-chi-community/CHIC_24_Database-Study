// Distance.js
import React from "react";
import Question from "./Question";

function Distance({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="나는 밥을 먹을 때 이곳까지 갈 수 있다."
      options={["15분 거리", "10분 거리", "5분 거리"]}
      nextPath="/manypeople"
      handleAnswer={(answer) => {
        let distance;
        if (answer === "15분 거리") distance = 15;
        else if (answer === "10분 거리") distance = 10;
        else if (answer === "5분 거리") distance = 5;
        handleAnswer("distance", distance);
      }}
    />
  );
}

export default Distance;
