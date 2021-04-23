import "./App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const [superhero, setSuperhero] = useState([]);

  const history = useHistory();
  const $token = window.localStorage.getItem("token");
  const token = JSON.parse($token);
  const URLToken = "10222296376330912";
  const baseUrl = `https://superheroapi.com/api`;

  function goLogin() {
    history.push("/login");
  }

  async function searchHero(value, setter) {
    if (value !== "" || null || undefined) {
      const res = await fetch(`${baseUrl}/${URLToken}/search/${value}`);
      const data = await res.json();
      setter(data.results);
      console.log(data);
    }
  }

  return (
    <>
      {(token && token !== null) || undefined ? (
        <div className="h-screen w-screen bg-purple-200 grid place-items-center">
          <div className="flex h-14  w-full bg-purple-800 self-start">
            <input
              className="w-3/4 p-2"
              type="text"
              placeholder="Buscá tu superheroe favorito!"
              onChange={(e) => searchHero(e.target.value, setSuperhero)}
            />
            <button className="w-1/4">Search!</button>
          </div>
        </div>
      ) : (
        goLogin()
      )}
    </>
  );
}

export default App;
