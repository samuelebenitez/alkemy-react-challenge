export default function HeroListItem({ hero, renderHeroInfo, deleteHero }) {
  function returnAlignment(alig) {
    switch (alig) {
      case "good":
        return "bg-green-300 w-screen  border-b h-40v border-purple-600 text-purple-900 p-3";
      case "bad":
        return "bg-red-300 w-screen  border-b h-40v border-purple-600 text-purple-900 p-3";
      case "neutral":
        return "bg-gray-400 w-screen  border-b h-40v border-purple-600 text-purple-900 p-3";

      default:
        break;
    }
  }

  return (
    <tr className={returnAlignment(hero.biography.alignment)}>
      <td className="text-sm  w-50v  font-bold uppercase text-center whitespace-nowrap sm:w-30v">
        <div className="flex  bg-purple-200 flex-col">
          <div className="my-4 bg-purple-200">
            <p> {hero.name}</p>
          </div>
          <div className="w-50v sm:w-30v">
            <img className="w-full" src={hero.image.url} alt="" />
          </div>
        </div>
      </td>
      <td className="w-50v  sm:w-70v">
        <div className="h-40v flex flex-col justify-between">
          <div className=" mb-2 h-full text-sm flex flex-col justify-between p-1">
            <p className="text-base sm:text-lg">
              Combate:
              {hero.powerstats.combat}
            </p>
            <div className="w-full h-sm  bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.combat}%` }}
                className=" h-sm bg-purple-500"
              ></div>
            </div>
            <p className="text-base sm:text-lg">
              Durabilidad: {hero.powerstats.durability}
            </p>
            <div className="w-full h-sm bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.durability}%` }}
                className="h-sm bg-purple-500"
              ></div>
            </div>
            <p className="text-base sm:text-lg">
              Inteligencia: {hero.powerstats.intelligence}
            </p>
            <div className="w-full h-sm bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.intelligence}%` }}
                className=" h-sm bg-purple-500"
              ></div>
            </div>
            <p className="text-base sm:text-lg">
              Poder: {hero.powerstats.power}
            </p>
            <div className="w-full h-sm bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.power}%` }}
                className=" h-sm bg-purple-500"
              ></div>
            </div>
            <p className="text-base sm:text-lg">
              Velocidad: {hero.powerstats.speed}
            </p>
            <div className="w-full h-sm bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.speed}%` }}
                className=" h-sm bg-purple-500"
              ></div>
            </div>
            <p className="text-base sm:text-lg">
              Fuerza: {hero.powerstats.strength}
            </p>
            <div className="w-full h-sm bg-purple-300">
              <div
                style={{ width: `${hero.powerstats.strength}%` }}
                className=" h-sm bg-purple-500"
              ></div>
            </div>
          </div>
          <div className="my-4 flex justify-around h-5v  sm:h-25v sm:my-1 ">
            <button
              onClick={() => renderHeroInfo(hero)}
              className="text-purple-200 rounded-lg shadow-lg text-sm cursor-pointer bg-purple-600 h-5v w-10v  sm:h-10v text-1xl"
            >
              Info
            </button>
            <button
              onClick={() => deleteHero(hero)}
              className="text-purple-200 rounded-lg shadow-lg text-sm cursor-pointer bg-red-600 h-5v w-10v sm:h-10v text-1xl"
            >
              X
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
