// Delivery.js
import React from "react";
import Question from "./Question";

function Delivery({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="나는 주로 배달 시켜 먹는다."
      options={["예", "아니요"]}
      nextPaths={["/result", "/distance"]}
      handleAnswer={(answer) =>
        handleAnswer("can_delivery", answer === "예" ? true : false)
      }
    />
  );
}

export default Delivery;
