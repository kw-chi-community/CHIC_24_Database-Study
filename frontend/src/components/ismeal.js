import React from "react";
import Question from "./Question";

function IsMeal({ step, handleAnswer }) {
  return (
    <Question
      step={step}
      question="밥 먹을 곳을 찾는 건가요?"
      options={["카페", "식당"]}
      nextPaths={["/cagong", "/menutype"]}
      handleAnswer={(answer) =>
        handleAnswer("ismeal", answer === "카페" ? false : true)
      }
    />
  );
}

export default IsMeal;
