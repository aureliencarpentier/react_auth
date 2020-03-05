import React, { useContext } from "react";
import AuthContext from "../context/auth";
import { Redirect } from "react-router-dom";

function Admin() {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext.setToken();
    localStorage.setItem("token", "");
    return <Redirect to="/" />;
  };

  return (
    <div>
      <h3>Admin page</h3>
      <p>We are on the Admin page</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}

export default Admin;
