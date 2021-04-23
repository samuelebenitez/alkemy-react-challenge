import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route>
        <Login exact path="/login" />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
