import React from "react";

export default function Footer() {
  return (
    <footer className="blog-footer">
      <div className="footer-list">
        <ul className="footer-ul">
          <h2>More</h2>
          <li>News</li>
          <li>Older Posts</li>
          <li>Favs</li>
          <li>Partners</li>
        </ul>
        <ul className="footer-ul">
          <h2>Partnership</h2>
          <li>Crypto</li>
          <li>Soul</li>
          <li>Dreams and Hopes</li>
          <li>Daily Market</li>
          <li>Dream Today</li>
        </ul>
        <ul className="footer-ul">
          <h2>Continent</h2>
          <li>America</li>
          <li>Europe</li>
          <li>Asia</li>
          <li>Africa</li>
          <li>Ocean</li>
        </ul>
      </div>
      <ul className="footer-ul2">
        <li>
          <i>Developer,</i>{" "}
        </li>
        <li>
          {" "}
          <i>is.sabrinadelvalle@gmail.com</i>
        </li>
        <li>
          <i>Caracas, Venezuela</i>
        </li>
      </ul>
    </footer>
  );
}
