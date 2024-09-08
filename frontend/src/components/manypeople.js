// ManyPeople.js
import React from "react";
import Question from "./Question";

function ManyPeople({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="개총, 종총과 같이 단체 손님으로 가는 건가요?"
      options={["예", "아니요"]}
      nextPath="/result"
      handleAnswer={(answer) =>
        handleAnswer("can_many_people", answer === "예" ? true : false)
      }
    />
  );
}

export default ManyPeople;
