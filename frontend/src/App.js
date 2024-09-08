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
import Admin from "./components/admin"; // Admin 컴포넌트 추가

function App() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    ismeal: null,
    can_ca_gong: null,
    menu_type: null,
    price: null,
    can_delivery: null,
    can_many_people: null,
    distance: null,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setStep(0); // "다시하기" 눌렀을 때 step을 0로 초기화
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

  const handleAnswer = (key, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const resetStep = () => {
    setStep(0);
    setAnswers({
      ismeal: null,
      can_ca_gong: null,
      menu_type: null,
      price: null,
      can_delivery: null,
      can_many_people: null,
      distance: null,
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Main resetStep={resetStep} />} />
      <Route
        path="/ismeal"
        element={<IsMeal step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/menutype"
        element={<MenuType step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/price"
        element={<Price step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/distance"
        element={<Distance step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/delivery"
        element={<Delivery step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/manypeople"
        element={<ManyPeople step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/cagong"
        element={<Cagong step={step} handleAnswer={handleAnswer} />}
      />
      <Route
        path="/result"
        elsement={<Result answers={answers} resetStep={resetStep} />}
      />
      <Route path="/admin" element={<Admin />} /> {/* Admin 경로 추가 */}
    </Routes>
  );
}

export default App;
