import React from "react";
import Question from "./Question";

function IsMeal({ step }) {
  return (
    <Question
      step={step}
      question="나는 간식보다 식사를 더 신경써서 먹는 편이다."
      options={["예", "아니요"]}
      nextPath="/distance"
    />
  );
}

export default IsMeal;
