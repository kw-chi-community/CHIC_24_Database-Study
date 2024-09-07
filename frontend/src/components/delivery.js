import React from "react";
import Question from "./Question";

function Delivery({ step }) {
  return (
    <Question
      step={step}
      question="배달 가능 여부가 중요한가요?"
      options={["예", "아니요"]}
      nextPath="/manypeople"
    />
  );
}

export default Delivery;
