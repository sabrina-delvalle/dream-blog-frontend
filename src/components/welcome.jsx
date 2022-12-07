import React from "react";
import NavBar from "./navbar"

export default function Header() {
  return (
  <div>
    <div className="Header">
        <div className="log">
        <a href={`${process.env.REACT_APP_ORIGIN_PAGE}/login`} className="log-link">Welcome, </a>/<a href={`${process.env.REACT_APP_ORIGIN_PAGE}/register`} className="log-link">:User </a>
        </div>
    </div>
    <NavBar/>
  </div>
  );
}
