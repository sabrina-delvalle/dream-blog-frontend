import React from "react";
import NavBar from "./navbar"

export default function Header() {
  return (
  <div>
    <div className="Header">
        <div className="log">
        <a href="http://localhost:3000/login" className="log-link">Welcome, </a>/<a href="http://localhost:3000/register" className="log-link">:User </a>
        </div>
    </div>
    <NavBar/>
  </div>
  );
}
