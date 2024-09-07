import React from "react";
import Question from "./Question";

function IsMeal({ step }) {
  return (
    <Question
      step={step}
      question="나는 식당보다 카페에 더 자주 간다."
      options={["예", "아니요"]}
      nextPaths={["/cagong", "/menutype"]}
    />
  );
}

export default IsMeal;
