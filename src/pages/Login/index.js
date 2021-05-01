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

  return (
    //TO VALIDATE IF TOKEN EXIST. IF ITS TRUE, GO TO HOME, IF ITS FALSE, RENDER THE LOGIN FORM
    <>
      {!window.localStorage.getItem("token") ? (
        <div className="h-100v w-100v bg-purple-400 grid place-items-center">
          <div className="h-70v flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-purple-200 flex flex-col w-90v h-70v px-4 py-16 rounded-md shadow-lg"
            >
              <label
                className="  mb-2 text-left text-purple-500 text-2xl w-full px-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowErrorEmpty(false);
                  setShowErrorApi(false);
                }}
                className=" border-b border-purple-500
                 h-12 mb-8   bg-purple-200 w-full py-2 px-1"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
              />
              <label
                className="  mb-2 text-left text-purple-500 text-2xl w-full px-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowErrorEmpty(false);
                  setShowErrorApi(false);
                }}
                className="border-b border-purple-500 h-12  mb-8  bg-purple-200 w-full py-2 px-1"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
              />
              {showErrorEmpty ? (
                <p className="flex justify-between items-center w-full m-1 text-red-500">
                  Revisá que los campos estén llenos
                </p>
              ) : null}
              {showErrorApi ? (
                <p className="flex justify-between items-center w-full m-1 text-red-500">
                  Ingresá información válida por favor
                </p>
              ) : null}
              <button className="h-10v rounded-lg bg-purple-500 w-full text-purple-200 text-2xl mt-6">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : (
        goHome()
      )}
    </>
  );
}
