const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const mariadb = require("mariadb");

const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const conn = mariadb.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
  multipleStatements: true,
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
      INSERT INTO chic-dbstudy.restaurant (restaurant_name, is_meal, signature_menu, signature_menu_price, distance, can_delivery, can_many_people, can_ca_gong)
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
    const result = await conn.query("SELECT * FROM chic-dbstudy.restaurant");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
