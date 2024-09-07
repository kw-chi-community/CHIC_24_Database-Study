import React from "react";
import Question from "./Question";

function ManyPeople({ step }) {
  return (
    <Question
      step={step}
      question="여럿이서 밥을 먹는 것을 좋아하시나요?"
      options={["예", "아니요"]}
      nextPath="/cagong"
    />
  );
}

export default ManyPeople;
