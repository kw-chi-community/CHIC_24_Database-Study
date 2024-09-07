import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./components/main";
import IsMeal from "./components/ismeal";
import Distance from "./components/distance";
import Delivery from "./components/delivery";
import ManyPeople from "./components/manypeople";
import Cagong from "./components/cagong";
import Result from "./components/result";

function App() {
  const [step, setStep] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/ismeal" ||
      location.pathname === "/distance" ||
      location.pathname === "/delivery" ||
      location.pathname === "/manypeople" ||
      location.pathname === "/cagong"
    ) {
      setStep((prevStep) => prevStep + 1);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/ismeal" element={<IsMeal step={step} />} />
      <Route path="/distance" element={<Distance step={step} />} />
      <Route path="/delivery" element={<Delivery step={step} />} />
      <Route path="/manypeople" element={<ManyPeople step={step} />} />
      <Route path="/cagong" element={<Cagong step={step} />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
