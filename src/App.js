import { useEffect, useState } from "react";
import "./App.css";

import styled from "@emotion/styled";
import { useHistory, useLocation } from "react-router-dom";

function App() {
  const Text = styled.div`
    color: red;
  `;
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    fetch(
      "https://run.mocky.io/v3/fa120fc2-a6cb-4481-baf0-a66e8146b367" +
        location.search
    )
      .then((res) => res.json())
      .then((res) => setResult(res.DATASET));

    if (location.search && location.search.includes("search")) {
      const query = location.search.split("search=")[1];
      setSearch(query);
    }
  }, []);
  useEffect(() => {
    history.push({ search: `?${new URLSearchParams({ search }).toString()}` });
    const filteredResults = result.filter((name) =>
      name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return setFiltered(filteredResults);
  }, [search, result, history]);

  return (
    <div className="App">
      <div>Search</div>
      <input
        type="text"
        value={search}
        onChange={(text) => setSearch(text.target.value)}
      />
      {filtered.map((name, index) => (
        <div key={index}>
          <Text>{name}</Text>
        </div>
      ))}
    </div>
  );
}
export default App;
