# 간단한 회원가입 기능 구현(INSERT)

```sql
CREATE TABLE member -- 회원 테이블
( mem_id  		CHAR(8) NOT NULL PRIMARY KEY, -- 사용자 아이디(PK)
  mem_name    	VARCHAR(10) NOT NULL, -- 이름
  mem_email    VARCHAR(50) NOT NULL,  -- 이메일
  mem_pw	  		VARCHAR(50) NOT NULL -- 비밀번호
)DEFAULT CHARSET=utf8;
```

```sql
ALTER TABLE member MODIFY mem_id INT AUTO_INCREMENT;
```

[Create a Registration Form With React.js, Expresss.js/Node.js & MySQL](https://www.youtube.com/watch?v=TMRyFDeJZtY)

데이터 입력을 위한 SQL문

`INSERT INTO member VALUES (NULL, "홍길동", "[hgd1234@naver.com](mailto:hgd1234@naver.com)", "hgd1234pw");`

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Signup from "./Signup";

function App() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/Query") // backend side에서 데이터 받아오기
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <div>
      <Signup setRefresh={setRefresh} />
      <table>
        <thead>
          <th>mem_name</th>
          <th>mem_email</th>
          <th>mem_pw</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.mem_name}</td>
              <td>{d.mem_email}</td>
              <td>{d.mem_pw}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

```

```jsx
import React, { useState } from "react";
import axios from "axios";

function Signup({ setRefresh }) {
  const [values, setValues] = useState({
    mem_name: "",
    mem_email: "",
    mem_pw: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/Signup", values)
      .then((res) => {
        console.log("Registered Successfully");
        setRefresh((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="mem_name"
                name="mem_name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="mem_email"
                name="mem_email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="mem_pw"
                name="mem_pw"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
export default Signup;

```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import "./index.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <hr></hr>
  </React.StrictMode>
);

```
