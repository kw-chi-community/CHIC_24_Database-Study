import React from "react";
import Question from "./Question";

function Cagong({ step }) {
  return (
    <Question
      step={step}
      question="카페에서 공부하는 것을 좋아하시나요?"
      options={["예", "아니요"]}
      nextPath="/price"
    />
  );
}

export default Cagong;
