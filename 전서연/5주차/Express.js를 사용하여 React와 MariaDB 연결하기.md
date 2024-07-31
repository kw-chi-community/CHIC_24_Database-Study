CHIC DB study | 5주차 2024.07.28.

[How to Connect React JS With MySQL Database using Node.JS/Express.js](https://www.youtube.com/watch?v=Q3ixb1w-QaY)

참고한 영상

### || backend side

`React-MariaDB-connect/backend`

npm 프로젝트 설정 파일인 package.json 파일 생성

```bash
npm init -y
```

프로젝트에 요구되는 package 파일 설치

```bash
npm install express mysql cors nodemon
```

database 연결을 위한 정보를 저장하는 `backend/database.json` 파일 작성

```json
{
  "host": "localhost",
  "user": "sample_user",
  "password": "sample_pw",
  "port": "3306",
  "database": "market_db"
}

```
연결한 database는 대충 이렇게 생겼다.
![image](https://github.com/user-attachments/assets/b0b48d9a-0d26-4a5b-88a3-0bbe548ec345)

server.js 아래와 같이 작성

```jsx
const express = require("express");
const cors = require("cors"); // cors 설정 코드
const app = express();

app.use(cors()); // cors 설정 코드

const PORT = process.env.PORT || 4000; // 해당 포트 number로 serving된다. localhost:4000

const mariadb = require("mariadb");

const fs = require("fs");
const data = fs.readFileSync("./database.json"); // database user name, pw, port, db name, table name 등 전달
const conf = JSON.parse(data);

const conn = mariadb.createPool({ // 여기에서 집어넣음
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

app.listen(4000, () => { // 연결 확인하려고 넣은 코드. 없어도 됨
  console.log("listing...");
});

app.get("/Query", async (req, res) => { // 여기로 아래 쿼리문의 결과가 serving 된다 localhost:4000/Query
  let result;
  try {
    result = await conn.query("SELECT * FROM member"); // 원하는 SQL문은 여기에 적기
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return;
  }
  res.send(result);
});

```

터미널의 `C:/…/React-MariaDB-connect/backend` 경로에서 아래 명령어를 입력하여 동작하는지 확인

```bash
npm start
```

### || frontend side

[Getting Started](https://vitejs.dev/guide/)

vite 공식 문서

react 앱 개발을 위해 Vite 설치

```bash
npm create vite@latest

# package name를 frontend로 입력하면 해당 이름의 directory가 생성된다
# framework는 React, variant는 JavaScript 선택
```

설정이 마무리되면 아래 경로로 파일이 생성된다.

`React-MariaDB-connect/frontend`

프로젝트에 요구되는 package 파일 설치

```bash
npm install
```

터미널의 `C:/…/React-MariaDB-connect/frontend` 경로에서 아래 명령어를 입력하여 동작하는지 확인

```bash
npm run dev
```

react 개발 환경 초기 세팅 하듯이… css 파일 다 날리기

`src/App.jsx`에 아래 코드를 입력

```
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/Query") // backend side에서 데이터 받아오기
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <table>
        <thead>
          <th>mem_id</th>
          <th>mem_name</th>
          <th>mem_number</th>
          <th>phone1</th>
          <th>phone2</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.mem_id}</td> // 받아온 데이터 출력하기
              <td>{d.mem_name}</td>
              <td>{d.mem_number}</td>
              <td>{d.phone1}</td>
              <td>{d.phone2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

```

명령어 입력해 잘 동작하는 지 확인

backend side 먼저 실행한 뒤에 실행해야 데이터를 받아올 수 있음 (당연함. 실행 안하면 데이터 안 들어옴)

```bash
npm run dev
```

![image](https://github.com/user-attachments/assets/7ea8f434-ae90-4e97-ade0-c94750fb28ac)
![image](https://github.com/user-attachments/assets/7dbdc514-d967-4d0f-aaa7-01af1267fcfe)

