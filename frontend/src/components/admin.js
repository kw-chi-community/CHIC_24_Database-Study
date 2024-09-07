import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [formData, setFormData] = useState({
    ismeal: null,
    can_ca_gong: null,
    menu_type: null,
    price: null,
    can_delivery: null,
    can_many_people: null,
    distance: null,
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/admin/save", formData);
      alert("Data saved successfully");
      fetchData();
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
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
      <h2>Saved Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Admin;
