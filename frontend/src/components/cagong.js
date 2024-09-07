import React from "react";
import Question from "./Question";

function Cagong({ step }) {
  return (
    <Question
      step={step}
      question="카페에서 공부하는 것을 좋아하시나요?"
      options={["예", "아니요"]}
      nextPath="/result" // 다음 질문 경로로 수정하세요
    />
  );
}

export default Cagong;
