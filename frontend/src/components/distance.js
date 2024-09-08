// Distance.js
import React from "react";
import Question from "./Question";

function Distance({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="나는 밥을 먹을 때 이곳까지 갈 수 있다."
      options={["15분 거리", "10분 거리", "5분 거리", "상관 없음"]}
      nextPath="/manypeople"
      handleAnswer={(answer) => {
        let distance;
        if (answer === "15분 거리") distance = 1000;
        else if (answer === "10분 거리") distance = 600;
        else if (answer === "5분 거리") distance = 300;
        else if (answer === "상관 없음") distance = 999999;
        handleAnswer("distance", distance);
      }}
    />
  );
}

export default Distance;
