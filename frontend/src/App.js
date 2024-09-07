import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./components/main";
import IsMeal from "./components/ismeal";
import Distance from "./components/distance";
import Delivery from "./components/delivery";
import ManyPeople from "./components/manypeople";
import Cagong from "./components/cagong";
import Result from "./components/result";
import Price from "./components/price";
import MenuType from "./components/menutype";

function App() {
  const [step, setStep] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setStep(1); // "다시하기" 눌렀을 때 step을 1로 초기화
    } else if (
      location.pathname === "/ismeal" || // 밥, 카페
      location.pathname === "/menutype" || // 쌀, 면, 고기
      location.pathname === "/cagong" || // 카공 여부
      location.pathname === "/price" || // 가격
      location.pathname === "/distance" || // 거리
      location.pathname === "/delivery" || // 배달 여부
      location.pathname === "/manypeople"
    ) {
      setStep((prevStep) => prevStep + 1);
    }
  }, [location]);

  const resetStep = () => {
    setStep(0);
  };

  return (
    <Routes>
      <Route path="/" element={<Main resetStep={resetStep} />} />
      <Route path="/ismeal" element={<IsMeal step={step} />} />
      <Route path="/menutype" element={<MenuType step={step} />} />
      <Route path="/price" element={<Price step={step} />} />
      <Route path="/distance" element={<Distance step={step} />} />
      <Route path="/delivery" element={<Delivery step={step} />} />
      <Route path="/manypeople" element={<ManyPeople step={step} />} />
      <Route path="/cagong" element={<Cagong step={step} />} />
      <Route path="/result" element={<Result resetStep={resetStep} />} />
    </Routes>
  );
}

export default App;
