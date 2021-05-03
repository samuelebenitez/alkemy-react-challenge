import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Team from "./components/Team";
import HeroInfo from "./components/HeroInfo";

function App() {
  const [searchedSuperhero, setSearchedSuperhero] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [hero, setHero] = useState([]);
  const [myTeamIds, setMyTeamIds] = useState([569]);
  const [showSearchError, setShowSearchError] = useState(false);
  const [showAlignmentError, setShowAlignmentError] = useState(false);

  const history = useHistory();
  const $token = window.localStorage.getItem("token");
  const token = JSON.parse($token);
  const URLToken = "10222296376330912";
  const baseUrl = `https://superheroapi.com/api`;

  //TO REDIRECT TO LOGIN PAGE IF TOKEN DOESN'T EXIST
  function goLogin() {
    history.push("/login");
  }

  // TO SEARCH HERO ON INPUT
  async function searchHero(value, setter) {
    if (value !== null || undefined) {
      const res = await fetch(`${baseUrl}/${URLToken}/search/${value}`);
      const data = await res.json();
      setShowSearchError(false);
      setShowAlignmentError(false);
      setter(data.results);
    }
  }

  //TO FETCH THE IDS TEAM AND BRING INFO
  async function bringMyTeam() {
    try {
      const res = await Promise.all(
        myTeamIds.map((id) => fetch(`${baseUrl}/${URLToken}/${id}`))
      );
      const resJson = await Promise.all(res.map((e) => e.json()));
      setMyTeam([...resJson]);
    } catch (err) {
      console.log(err);
    }
  }

  //TO SHOW HERO'S INFO
  function renderHeroInfo(hero) {
    setHero(hero);
    setShowInfo((prevState) => !prevState);
  }

  function returnAlignment(alig) {
    switch (alig) {
      case "good":
        return <p className="bg-green-500 w-20v rounded-md">Bueno</p>;
      case "bad":
        return <p className="bg-red-500 w-20v rounded-md">Malo</p>;
      case "neutral":
        return <p className="bg-gray-400 w-20v rounded-md">Neutral</p>;

      default:
        break;
    }
  }

  //TO ADD HERO TO TEAM
  function addHero(hero) {
    const aligmentResult = [];
    let good = 0;
    let bad = 0;
    myTeam.map((her) => aligmentResult.push(her.biography.alignment));

    aligmentResult.map((h) => {
      if (h === "bad") {
        return (bad = bad + 1);
      } else if (h === "good") {
        return (good = good + 1);
      } else return null;
    });

    if (myTeamIds.length < 6) {
      if (hero.biography.alignment === "good" && good < 3) {
        setMyTeamIds([...myTeamIds, hero.id]);
        setSearchedSuperhero([]);
        setShowAlignmentError(false);
      } else if (hero.biography.alignment === "bad" && bad < 3) {
        setMyTeamIds([...myTeamIds, hero.id]);
        setSearchedSuperhero([]);
        setShowAlignmentError(false);
      } else setShowAlignmentError(true);
    } else {
      setShowSearchError(true);
      setSearchedSuperhero([]);
    }
  }

  function deleteHero(heroToDelete) {
    if (myTeamIds.length >= 1) {
      const $myTeam = myTeamIds.filter((id) => id !== heroToDelete.id);
      setMyTeamIds($myTeam);
    }
  }

  useEffect(() => {
    bringMyTeam();
  }, [myTeam]);

  return (
    <>
      {(token && token !== null) || undefined ? (
        <div className="w-screen bg-purple-200 flex flex-col  overflow-x-hidden">
          {/* //SEARCH INPUT */}
          <div className="flex h-10v w-screen bg-purple-800 self-start shadow-md pl-1">
            <div className="h-10v flex-col flex justify-center">
              <input
                className="w-75v p-2 shadow-inner"
                type="text"
                placeholder="Buscá tu superheroe favorito!"
                onChange={(e) =>
                  searchHero(e.target.value, setSearchedSuperhero)
                }
              />
              {showSearchError ? (
                <p className="text-red-500 text-sm bg-purple-300 ">
                  Equipo lleno, elimine al menos uno
                </p>
              ) : null}
              {showAlignmentError ? (
                <p className="text-red-500 text-xs bg-purple-300 ">
                  El equipo debe tener al menos 3 miembros con orientación buena
                  y 3 miembros con orientación mala
                </p>
              ) : null}
            </div>
            <button className=" w-25v text-purple-200 text-center text-1xl cursor-pointer">
              Search!
            </button>
          </div>
          {/* // SEARCH RESULTS DIV */}
          <div className="w-screen top-24 shadow-lg">
            {searchedSuperhero?.length < 2 ? null : (
              <div className="bg-purple-200 w-screen ">
                {searchedSuperhero?.slice(0, 5).map((s) => (
                  <div
                    key={s.id}
                    className="flex w-screen items-center justify-between h-15v border-b border-purple-700 p-2"
                  >
                    <div className="w-1/4">
                      <img
                        className="w-xl"
                        src={s.image.url}
                        alt={`${s.name}`}
                      />
                    </div>
                    <div className="w-2/4 flex flex-col justify-center">
                      <p className="my-2 text-purple-800 text-lg">{s.name}</p>

                      <p className="my-2 text-center   text-purple-200 text-md rounded-md flex justify-center">
                        {returnAlignment(s.biography.alignment)}
                      </p>
                    </div>

                    <button
                      onClick={() => addHero(s)}
                      className="text-purple-200 w-15v cursor-pointer text-5xl uppercase font-bold bg-purple-600  rounded-2xl shadow-md flex  justify-center items-center pb-2"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* //RENDER HEROINFO COMPONENT */}
          <div>
            {showInfo ? (
              <HeroInfo setShowInfo={setShowInfo} hero={hero} />
            ) : null}
          </div>
          {/* //MY TEAM */}
          <div className="h-85v w-screen mt-4">
            {myTeamIds.length >= 1 ? (
              <Team
                deleteHero={deleteHero}
                renderHeroInfo={renderHeroInfo}
                myTeam={myTeam}
              />
            ) : (
              <p>
                Tu equipo se encuentra vacío, buscá un heroe en el buscador y
                agregalo a tu equipo!
              </p>
            )}
          </div>
        </div>
      ) : (
        //IF USER DOESN'T HAVE TOKEN, REDIRECT TO LOGIN PAGE
        goLogin()
      )}
    </>
  );
}

export default App;
