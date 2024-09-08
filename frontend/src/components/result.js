import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./result.css";
import "../Buttons.css";

function Result({ answers, resetStep }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [answers]);

  return (
    <div>
      <h2>조건에 맞는 음식점들...</h2>
      {/* <pre>{JSON.stringify(answers, null, 2)}</pre> */}
      {loading ? (
        <p>로딩중...</p>
      ) : (
        <div>
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurent-box">
              <h3>{restaurant.restaurant_name}</h3>
              <div className="signature-menu">
                <p className="menu-name">{restaurant.signature_menu}</p>
                <p className="menu-price">
                  {restaurant.signature_menu_price}원
                </p>
              </div>
              <p>거리: {restaurant.distance}m</p>
              <p>배달 가능: {restaurant.can_delivery ? "가능" : "불가능"}</p>
              <p>단체 가능: {restaurant.can_many_people ? "가능" : "불가능"}</p>
              <div>
                {restaurant.menus.map((menu, menuIndex) => (
                  <div key={menuIndex}>
                    <div className="menu">
                      <div className="signature-menu">
                        <p className="menu-name">{menu.menu_name}</p>
                        <p className="menu-price">{menu.menu_price}원</p>
                        <p className="menu-price">({menu.detail_menu_type})</p>
                      </div>
                      <p>{menu.menu_description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleClick} className="goto-first">
        다시하기
      </button>
    </div>
  );
}

export default Result;
