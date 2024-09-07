const express = require("express");
const cors = require("cors"); // cors 설정 코드
const app = express();

app.use(cors()); // cors 설정 코드

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

app.get("/", (re, res) => {
  return res.json("From backendSide");
});

app.listen(4000, () => {
  console.log("listing...");
});

app.get("/Query", async (req, res) => {
  let result;
  try {
    result = await conn.query("SELECT * FROM member");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return;
  }
  res.send(result);
});
