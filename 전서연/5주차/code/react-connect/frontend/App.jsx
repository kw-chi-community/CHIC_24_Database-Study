import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/Query")
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
              <td>{d.mem_id}</td>
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
