import React from "react";
import loginPng from "../images/login.png";
import privacyPng from "../images/security.png";
import logoutPng from "../images/logout.png";
import blogPng from "../images/blog.png";
import legalPng from "../images/legal.png";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

function Account() {
  const [image, setImage] = useState({});

  const handleImage = (event) => {
    console.log("value of image for update profile: ", event.target);
    setImage(event.target.files[0]);
    //axios call to update??
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handling submit for updates...");
    console.log("my image", image);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", localStorage.getItem("id"));

    axios
      .patch(`${process.env.REACT_APP_API}/updateaccount`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("image", response.data.image);
        document.location.replace("/account");
      });
  };

  const clearCookie = async () => {
    try {
      console.log("here handling cookie inside");
      await axios
        .get(`${process.env.REACT_APP_API}/clearcookie`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          //document.location.reload('/')
          Cookies.remove("userSession");
          Cookies.remove("Token");
          localStorage.clear();
          document.location.replace("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-profile">
      <aside className="userdata">
        <a href="/profile" className="menu-item">
          {" "}
          <img
            src={loginPng}
            alt="login"
            style={{ width: "25px", margin: "0 10px 0 0" }}
          ></img>{" "}
          <span className="user-items item-top">Account</span>{" "}
        </a>
        <a href="/profile" className="menu-item">
          {" "}
          <img
            src={privacyPng}
            alt="login"
            style={{ width: "25px", margin: "0 10px 0 0" }}
          ></img>{" "}
          <span className="user-items item-top">Privacy</span>{" "}
        </a>
        <a href="/profile" className="menu-item">
          {" "}
          <img
            src={blogPng}
            alt="login"
            style={{ width: "25px", margin: "0 10px 0 0" }}
          ></img>{" "}
          <span className="user-items item-top">Blog's Info</span>{" "}
        </a>
        <a href="/profile" className="menu-item">
          {" "}
          <img
            src={legalPng}
            alt="login"
            style={{ width: "25px", margin: "0 10px 0 0" }}
          ></img>{" "}
          <span className="user-items item-top">Policies</span>{" "}
        </a>

        <button onClick={clearCookie} className="logout-internal-pannel">
          <span className="menu-item">
            {" "}
            <img
              src={logoutPng}
              alt="login"
              style={{ width: "25px", margin: "0 10px 0 0" }}
            ></img>{" "}
            <span className="user-items item-top">logout</span>{" "}
          </span>
        </button>
      </aside>

      <main className="user-actions">
        <form onSubmit={handleSubmit}>
          <h2 className="profile-subtitle">Accounts Page</h2>
          <div className="account-img-wrapper">
            <label
              className="imageBtn2"
              name="profileImage"
              htmlFor="profileImage"
              style={{ color: "green" }}
            >
              Change Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={handleImage}
            />
          </div>
          <input
            type="submit"
            value="Update"
            className="input-update-profile"
          />
        </form>

        <a href="/" style={{ color: "red" }}>
          Delete Account
        </a>
      </main>
    </div>
  );
}

export default Account;
