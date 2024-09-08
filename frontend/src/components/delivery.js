// Delivery.js
import React from "react";
import Question from "./Question";

function Delivery({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="배달이 필요한가요?"
      options={["예", "아니요"]}
      nextPaths={["/result", "/distance"]}
      handleAnswer={(answer) =>
        handleAnswer("can_delivery", answer === "예" ? true : false)
      }
    />
  );
}

export default Delivery;
