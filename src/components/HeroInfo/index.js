export default function HeroInfo({ hero, setShowInfo }) {
  const { height, weight } = hero.appearance;

  const infoFieldStyles = "text-center text-2xl border-b  border-purple-200";
  const titleFieldStyle = "text-1xl text-center h-full uppercase underline ";
  return (
    <section
      className="fixed  w-90v h-90v top-5 left-3 bg-gray-600 rounded-md shadow-xl bg-center bg-blend-multiply bg-cover"
      style={{ backgroundImage: `url(${hero.image.url})` }}
    >
      <div className="w-full h-20v bg-cover  bg-purple-700 bg-opacity-50 ">
        <button
          onClick={() => setShowInfo((prevState) => !prevState)}
          className="bg-red-600 text-white  text-2xl w-10v h-5v"
        >
          X
        </button>
        <h1 className="text-center p-4 text-4xl uppercase text-purple-400">
          {hero.name}
        </h1>
      </div>
      <div className="text-purple-200 ">
        <div className="py-1">
          <p className={titleFieldStyle}>nombre completo</p>
          <p className={infoFieldStyles}>{hero.biography["full-name"]}</p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}>Alias</p>
          <p className={infoFieldStyles}>{hero.biography.aliases[0]}</p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}>altura</p>
          <p
            className={infoFieldStyles + " tracking-wider flex justify-center"}
          >
            {height.map((key, h) => (
              <p key={key} className="mx-2">
                {h}
              </p>
            ))}
          </p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}>peso</p>
          <p
            className={infoFieldStyles + " tracking-wider flex justify-center"}
          >
            {weight.map((key, w) => (
              <p key={key} className="mx-2">
                {w}
              </p>
            ))}
          </p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}>color de ojos</p>
          <p className={infoFieldStyles}>{hero.appearance["eye-color"]}</p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}>color de cabello</p>
          <p className={infoFieldStyles}>{hero.appearance["hair-color"]}</p>
        </div>
        <div className="py-1">
          <p className={titleFieldStyle}> Lugar de trabajo </p>
          <p className="text-center text-xs">{hero.work.base}</p>
        </div>
      </div>
    </section>
  );
}
