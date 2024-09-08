const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config(); // 환경 변수 로드

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const mysql = require("mysql2/promise");

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  return res.json("From backendSide");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/admin/save", async (req, res) => {
  const {
    ismeal,
    can_ca_gong,
    menu_type,
    price,
    can_delivery,
    can_many_people,
    distance,
  } = req.body;
  try {
    await conn.query(
      `
      INSERT INTO restaurant (restaurant_name, is_meal, signature_menu, signature_menu_price, distance, can_delivery, can_many_people, can_ca_gong)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        menu_type,
        ismeal,
        menu_type,
        price,
        distance,
        can_delivery,
        can_many_people,
        can_ca_gong,
      ]
    );
    res.status(200).send("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/admin/data", async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * FROM restaurant");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
