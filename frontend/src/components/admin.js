import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [formData, setFormData] = useState({
    restaurant_name: "",
    ismeal: null,
    signature_menu: "",
    signature_menu_price: "",
    distance: "",
    can_delivery: null,
    can_many_people: null,
    can_ca_gong: null,
    running_day: "",
    weekday_running_time: "",
    weekend_running_time: "",
    food_types: [],
    menu_items: [],
  });

  const [data, setData] = useState([]);
  const [foodType, setFoodType] = useState("");
  const [menuItem, setMenuItem] = useState({
    menu_name: "",
    menu_price: "",
    menu_type: "",
    detail_menu_type: "",
    menu_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
  };

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prevMenuItem) => ({
      ...prevMenuItem,
      [name]: value,
    }));
  };

  const addMenuItem = () => {
    if (menuItem.menu_name && menuItem.menu_price) {
      setFormData((prevData) => ({
        ...prevData,
        menu_items: [...prevData.menu_items, menuItem],
      }));
      setMenuItem({
        menu_name: "",
        menu_price: "",
        menu_type: "",
        detail_menu_type: "",
        menu_description: "",
      });
    } else {
      console.error(
        `둘 중 하나가 비었어요. menu_name: "${menuItem.menu_name}", menu_price: "${menuItem.menu_price}"`
      );
    }
  };

  const removeMenuItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      menu_items: prevData.menu_items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/admin/save", formData);
      fetchData();
      console.log("fomr data: ", formData);
      console.log("menu item", menuItem);
      console.log("done!");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/data");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "100px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>restaurant_name</label>
          <input
            type="text"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            ismeal
            <input
              type="checkbox"
              name="ismeal"
              checked={formData.ismeal}
              onChange={(e) =>
                setFormData({ ...formData, ismeal: e.target.checked })
              }
            />
          </label>
        </div>
        <div>
          <label>
            signature_menu
            <input
              type="text"
              name="signature_menu"
              value={formData.signature_menu}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            signature_menu_price
            <input
              type="number"
              name="signature_menu_price"
              value={formData.signature_menu_price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            distance
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            can_delivery
            <input
              type="checkbox"
              name="can_delivery"
              checked={formData.can_delivery}
              onChange={(e) =>
                setFormData({ ...formData, can_delivery: e.target.checked })
              }
            />
          </label>
        </div>
        <div>
          <label>
            can_many_people
            <input
              type="checkbox"
              name="can_many_people"
              checked={formData.can_many_people}
              onChange={(e) =>
                setFormData({ ...formData, can_many_people: e.target.checked })
              }
            />
          </label>
        </div>
        <div>
          <label>
            can_ca_gong
            <input
              type="checkbox"
              name="can_ca_gong"
              checked={formData.can_ca_gong}
              onChange={(e) =>
                setFormData({ ...formData, can_ca_gong: e.target.checked })
              }
            />
          </label>
        </div>
        <div>
          <label>
            running_day
            <input
              type="text"
              name="running_day"
              value={formData.running_day}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            weekday_running_time
            <input
              type="text"
              name="weekday_running_time"
              value={formData.weekday_running_time}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>weekend_running_time</label>
          <input
            type="text"
            name="weekend_running_time"
            value={formData.weekend_running_time}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>foodType</label>
          <input type="text" value={foodType} onChange={handleFoodTypeChange} />
        </div>

        <div>
          <label>menus</label>
          <input
            type="text"
            name="menu_name"
            value={menuItem.menu_name}
            onChange={handleMenuItemChange}
            placeholder="menu_name"
          />
          <input
            type="number"
            name="menu_price"
            value={menuItem.menu_price}
            onChange={handleMenuItemChange}
            placeholder="menu_price"
          />
          <select
            name="menu_type"
            value={menuItem.menu_type}
            onChange={handleMenuItemChange}
          >
            <option value="" disabled>
              menu_type
            </option>
            <option value="밥">밥</option>
            <option value="면">면</option>
            <option value="고기">고기</option>
            <option value="기타">기타</option>
          </select>

          <input
            type="text"
            name="detail_menu_type"
            value={menuItem.detail_menu_type}
            onChange={handleMenuItemChange}
            placeholder="detail_menu_type"
          />
          <input
            type="text"
            name="menu_description"
            value={menuItem.menu_description}
            onChange={handleMenuItemChange}
            placeholder="menu_description"
          />
          <button type="button" onClick={addMenuItem}>
            add
          </button>
        </div>
        <div>
          {formData.menu_items.map((item, index) => (
            <p key={index}>
              {item.menu_name} {item.menu_price}원 {item.menu_type}{" "}
              {item.detail_menu_type} ({item.menu_description})
              <button type="button" onClick={() => removeMenuItem(index)}>
                remove
              </button>
            </p>
          ))}
        </div>

        <button type="submit">save</button>
      </form>
      <h3>restaurant</h3>
      <ul>
        {data.map((restaurant) => (
          <div key={restaurant.id}>
            <p>{restaurant.restaurant_name}</p>
            <div>
              {(restaurant.food_types || []).map((foodType) => (
                <p key={foodType.id}>{foodType.food_type}</p>
              ))}
            </div>
            <p>running_day: {restaurant.running_day}</p>
            <p>weekday_running_time: {restaurant.weekday_running_time}</p>
            <p>weekend_running_time: {restaurant.weekend_running_time}</p>

            <b>menus</b>
            <ul>
              {restaurant.menus.map((menu) => (
                <li key={menu.id}>
                  {menu.menu_name} - {menu.menu_price}
                  <ul>
                    {(menu.menu_types || []).map((menuType) => (
                      <li key={menuType.id}>
                        {menuType.menu_type} - {menuType.detail_menu_type}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Admin;
