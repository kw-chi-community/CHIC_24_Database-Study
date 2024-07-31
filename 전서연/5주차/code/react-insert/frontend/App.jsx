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
