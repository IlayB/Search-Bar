import { useEffect, useState } from "react";
import "./App.css";

import styled from "@emotion/styled";

function App() {
  const Text = styled.div`
    color: red;
  `;

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/fa120fc2-a6cb-4481-baf0-a66e8146b367")
      .then((res) => res.json())
      .then((res) => setResult(res.DATASET));
  }, []);
  useEffect(() => {
    const filteredResults = result.filter((name) =>
      name.toLowerCase().includes(search.trim().toLowerCase())
    );
    return setFiltered(filteredResults);
  }, [search, result]);

  return (
    <div className="App">
      <div>Search</div>
      <input type="text" onChange={(text) => setSearch(text.target.value)} />
      {filtered.map((name, index) => (
        <div key={index}>
          <Text>{name}</Text>
        </div>
      ))}
    </div>
  );
}
export default App;
