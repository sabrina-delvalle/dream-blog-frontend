import React from "react";

export default function NavBar() {
  return (
    <div>
      <nav className="NavBar">
        <a href={`${process.env.REACT_APP_ORIGIN_PAGE}`} className="nav-item">
          Categories
        </a>
        <a href={`${process.env.REACT_APP_ORIGIN_PAGE}`} className="nav-item">
          Partners
        </a>
        <a href={`${process.env.REACT_APP_ORIGIN_PAGE}`} className="nav-item">
          Dreamers
        </a>
        <a href={`${process.env.REACT_APP_ORIGIN_PAGE}`} className="nav-item">
          Info
        </a>
      </nav>
    </div>
  );
}
