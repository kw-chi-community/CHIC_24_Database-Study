import React from "react";
import Question from "./Question";

function ManyPeople({ step }) {
  return (
    <Question
      step={step}
      question="회식처럼 여럿이서 밥을 먹는 것을 좋아한다."
      options={["예", "아니요"]}
      nextPath="/result"
    />
  );
}

export default ManyPeople;
