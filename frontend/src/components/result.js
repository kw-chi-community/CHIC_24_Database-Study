import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Result({ answers, resetStep }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const handleClick = () => {
    resetStep();
    navigate("/");
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:4000/restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [answers]);

  return (
    <div className="main-component">
      <h1>나에게 맞는 광운대 맛집들은...</h1>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
      <h2>추천 맛집:</h2>
      <div>
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <h3>{restaurant.restaurant_name}</h3>
            <p>추천 메뉴: {restaurant.signature_menu}</p>
            <p>가격: {restaurant.signature_menu_price}원</p>
            <p>거리: {restaurant.distance}m</p>
            <p>배달 가능: {restaurant.can_delivery ? "가능" : "불가능"}</p>
            <p>단체 가능: {restaurant.can_many_people ? "가능" : "불가능"}</p>
            <h4>메뉴:</h4>
            <div>
              {restaurant.menus.map((menu, menuIndex) => (
                <div key={menuIndex}>
                  <p>메뉴 이름: {menu.menu_name}</p>
                  <p>가격: {menu.menu_price}원</p>
                  <p>종류: {menu.menu_type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleClick}>다시하기</button>
    </div>
  );
}

export default Result;
