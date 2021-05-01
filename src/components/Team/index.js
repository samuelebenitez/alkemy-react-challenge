import HeroListItem from "../HeroListItem";
import { useState, useEffect } from "react";

export default function Team({ myTeam, renderHeroInfo, deleteHero }) {
  const [myTeamPowerstats, setMyTeamPowerstats] = useState({
    combat: 0,
    durability: 0,
    intelligence: 0,
    power: 0,
    speed: 0,
    strength: 0,
  });

  useEffect(() => {
    calculatePowerStats();
  }, [myTeam]);

  // TO CALCULATE THE HEIGHT AVERAGE OF THE TEAM
  const teamsHeight = () => {
    //take the height in cm
    const height = myTeam.map((hero) => hero.appearance?.height[1]);
    //cut "cm" string
    const stringCut = height?.map((h) => h?.substr(0, h.length - 3));
    //add all heights
    const heightSum = stringCut.reduce((a, b) => +a + +b, 0);
    //divide the result in six and cut the decimals
    const $teamsHeight = Math.floor(heightSum / 6);
    return $teamsHeight;
  };
  // TO CALCULATE THE WEIGHT AVERAGE OF THE TEAM
  const teamsWeight = () => {
    //take the weight in cm
    const weight = myTeam.map((hero) => hero.appearance?.weight[1]);
    //cut "cm" string
    const stringCut = weight?.map((h) => h?.substr(0, h.length - 3));
    //add all weights'
    const weightSum = stringCut.reduce((a, b) => +a + +b, 0);
    //divide the result in six and cut the decimals
    const $teamsWeight = Math.floor(weightSum / 6);
    return $teamsWeight;
  };
  // TO CALCULATE TOTAL POWERSTATS OF THE TEAM
  function calculatePowerStats() {
    let combat = 0;
    let durability = 0;
    let intelligence = 0;
    let power = 0;
    let speed = 0;
    let strength = 0;

    myTeam.map((hero) => {
      combat = combat + +hero.powerstats.combat;
      durability = durability + +hero.powerstats.durability;
      intelligence = intelligence + +hero.powerstats.intelligence;
      power = power + +hero.powerstats.power;
      speed = speed + +hero.powerstats.speed;
      strength = strength + +hero.powerstats.strength;
    });

    setMyTeamPowerstats({
      combat: combat,
      durability: durability,
      intelligence: intelligence,
      power: power,
      speed: speed,
      strength: strength,
    });
  }
  //TO DETERMINATE TEAM'S TYPE
  const teamType = Object.keys(myTeamPowerstats).sort(
    (a, b) => myTeamPowerstats[a] + myTeamPowerstats[b]
  );

  return (
    <>
      <h2 className="text-purple-900 text-4xl font-bold my-4 underline text-center">
        Mi equipo
      </h2>
      <div className="flex text-center justify-around w-screen ">
        <div className="w-1/2 p-1">
          <p className="underline text-purple-800 font-bold">Tipo</p>
          <p className="uppercase text-purple-600">{teamType[0]}</p>
          <p className="underline text-purple-800 font-bold">
            Cantidad de miembros
          </p>
          <p className="uppercase text-purple-600">{myTeam.length}</p>
        </div>
        <div className="w-1/2 p-1">
          <p className="underline text-purple-800 font-bold">Altura promedio</p>
          <p className="uppercase text-purple-600">{teamsHeight()} cm</p>
          <p className="underline text-purple-800 font-bold">Peso promedio </p>
          <p className="uppercase text-purple-600">{teamsWeight()} kg</p>
        </div>
      </div>
      <div className="text-center p-2 my-6">
        <h3 className="text-purple-900 text-2xl font-bold my-4 underline text-center">
          Estadísticas del equipo
        </h3>
        <p className="text-purple-800">Combate: {myTeamPowerstats.combat}</p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.combat / 6}%` }}
            className=" h-md bg-purple-500"
          ></div>
        </div>
        <p className="text-purple-800">
          Durabilidad: {myTeamPowerstats.durability}
        </p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.durability / 6}%` }}
            className="h-md bg-purple-500"
          ></div>
        </div>
        <p className="text-purple-800">
          Inteligencia: {myTeamPowerstats.intelligence}
        </p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.intelligence / 6}%` }}
            className=" h-md bg-purple-500"
          ></div>
        </div>
        <p className="text-purple-800">Poder: {myTeamPowerstats.power}</p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.power / 6}%` }}
            className=" h-md bg-purple-500"
          ></div>
        </div>
        <p className="text-purple-800">Velocidad: {myTeamPowerstats.speed}</p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.speed / 6}%` }}
            className=" h-md bg-purple-500"
          ></div>
        </div>
        <p className="text-purple-800">Fuerza: {myTeamPowerstats.strength}</p>
        <div className="w-full h-md bg-purple-300 mb-1">
          <div
            style={{ width: `${myTeamPowerstats.strength / 6}%` }}
            className=" h-md bg-purple-500"
          ></div>
        </div>
      </div>
      <table className=" pt-16 w-screen bg-purple-400 ">
        <tbody className="w-screen">
          <tr
            className={" h-10v text-purple-200 w-screen font-bold text-center"}
          >
            <td className="bg-purple-800 w-50v sm:w-30v">Nombre</td>
            <td className="bg-purple-800 w-50v sm:w-70v">PowerStats</td>
          </tr>

          {myTeam.map((hero) => (
            <HeroListItem
              renderHeroInfo={renderHeroInfo}
              hero={hero}
              key={hero.id}
              deleteHero={deleteHero}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
