import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorEmpty, setShowErrorEmpty] = useState(false);
  const [showErrorApi, setShowErrorApi] = useState(false);

  //ENDPOINT TO LOGIN
  const loginUrl = "http://challenge-react.alkemy.org/";

  //OBJECT TO REDIRECT
  const history = useHistory();

  // TAILWIND GENERIC CLASSES
  const inputStyle = "h-12 rounded-lg bg-purplee-100 w-full p-2";
  const labelStyle = "text-left w-full px-1";

  //CONVERT TO URLENCODED (fetch automatically send a urlencoded when has an object of type URLSearchParams  in the body)
  const bodyObject = new URLSearchParams({
    email: email,
    password: password,
  });
  //REQUEST DATA
  const request = {
    method: "POST",
    body: bodyObject,
  };

  //LOGIN FUNCTION
  async function loginRequest() {
    const res = await fetch(loginUrl, request);
    const $token = await res.json();
    if ($token.token) {
      window.localStorage.setItem("token", JSON.stringify($token.token));
      goHome();
      console.log("Soy el token", $token.token);
    } else {
      console.log("Soy el error", $token.error);
      setShowErrorApi(true);
    }
  }

  //TO VALIDATE IF FIELDS ARE COMPLETED
  function handleSubmit(e) {
    e.preventDefault();
    //TO VALIDATE BOTH FIELDS
    if ((email && password !== "") || null || undefined) {
      loginRequest();
    } else {
      setShowErrorEmpty(true);
    }
  }

  // TO REDIRECT TO HOME
  function goHome() {
    history.push("/");
  }

  //TO RENDER CLEANINPUTS BUTTON
  function renderButton() {
    return (
      <button
        onClick={cleanInputs}
        className="text-gray-900 rounded-lg h-10 p-2 bg-purplee-600"
      >
        Limpiar los campos
      </button>
    );
  }

  //FUNCTION TO CLEANS INPUTS
  function cleanInputs() {
    setEmail("");
    setPassword("");
    setShowErrorApi(false);
    setShowErrorEmpty(false);
  }

  return (
    //TO VALIDATE IF TOKEN EXIST. IF ITS TRUE, GO TO HOME, IF ITS FALSE, RENDER THE LOGIN FORM
    <>
      {!window.localStorage.getItem("token") ? (
        <div className="h-screen w-screen bg-purple-200 grid place-items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-purple-400 flex    flex-col w-2/3 h-3/4 justify-between items-center p-4 rounded-lg shadow-lg"
          >
            <label className={labelStyle} htmlFor="email">
              EMAIL
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
            />
            <label className={labelStyle} htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
            />
            {showErrorEmpty ? (
              <p className="flex justify-between items-center w-full m-4 text-red-500">
                Revisá que los campos estén llenos {renderButton()}
              </p>
            ) : null}
            {showErrorApi ? (
              <p className="flex justify-between items-center w-full m-4 text-red-500">
                Ingresá información válida por favor {renderButton()}
              </p>
            ) : null}
            <button className="h-14 rounded-lg bg-purple-500 w-full">
              Entrar
            </button>
          </form>
        </div>
      ) : (
        goHome()
      )}
    </>
  );
}
