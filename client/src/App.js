import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AuthContext from "./context/auth";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(props) {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || ""
  );
  console.log({ authToken });

  const setToken = data => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ token: authToken, setToken: setToken }}>
      <div className="App">
        <h1>React auth app</h1>
        <Router>
          <div className="NavBar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
