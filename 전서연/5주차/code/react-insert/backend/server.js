const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors"); // cors 설정 코드

const app = express();

app.use(cors()); // cors 설정 코드
app.use(express.json());

const PORT = process.env.PORT || 4000; // 해당 포트 number로 serving된다. localhost:4000

const fs = require("fs");
const data = fs.readFileSync("./database.json"); // database user name, pw, port, db name, table name 등 전달
const conf = JSON.parse(data);

const conn = mariadb.createPool({
  // 여기에서 집어넣음
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
  console.log("listening...");
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

app.post("/Signup", (req, res) => {
  const sql =
    "INSERT INTO member (`mem_name`, `mem_email`, `mem_pw`) VALUES (?, ?, ?);"; // '?'를 세 개로 변경
  const values = [req.body.mem_name, req.body.mem_email, req.body.mem_pw];
  conn.query(sql, values, (err, data) => {
    // '[values]'를 'values'로 변경
    if (err) return res.json(err);
    return res.json(data);
  });
});
