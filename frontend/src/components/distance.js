import React from "react";
import Question from "./Question";

function Distance({ step }) {
  return (
    <Question
      step={step}
      question="나는 밥을 먹을 때 이곳까지 갈 수 있다."
      options={["15분 거리", "10분 거리", "5분 거리"]}
      nextPath="/delivery" // 다음 질문 경로로 수정하세요
    />
  );
}

export default Distance;
