// Cagong.js
import React from "react";
import Question from "./Question";

function Cagong({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="카페에서 공부하는 것을 좋아하시나요?"
      options={["예", "아니요"]}
      nextPath="/price"
      handleAnswer={(answer) =>
        handleAnswer("can_ca_gong", answer === "예" ? true : false)
      }
    />
  );
}

export default Cagong;
