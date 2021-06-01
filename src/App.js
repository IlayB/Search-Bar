import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("https://run.mocky.io/v3/fa120fc2-a6cb-4481-baf0-a66e8146b367")
      .then((res) => res.json())
      .then((res) => {
        setResult(
          Object.values(res.DATASET).filter((data) =>
            data.toLowerCase().includes(search.trim().toLowerCase())
          )
        );
      });
  }, [search]);
  return (
    <div className="App">
      <div>Search</div>
      <input type="text" onChange={(text) => setSearch(text.target.value)} />
      {Object.values(result).map(function (name) {
        return <div>{name}</div>;
      })}
    </div>
  );
}

export default App;
