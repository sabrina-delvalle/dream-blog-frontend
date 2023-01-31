import loginPng from "../images/login.png";
import privacyPng from "../images/security.png";
import logoutPng from "../images/logout.png";
import blogPng from "../images/blog.png";
import legalPng from "../images/legal.png";
import newPng from "../images/new-file.png";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default function Userprofile() {
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
        <a href="/account" className="menu-item">
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
        <a href="/new-post" type="text" className="post-button">
          NEW POST{" "}
          <img
            src={newPng}
            alt="login"
            style={{ width: "25px", margin: "0 0 0 10px" }}
          ></img>
        </a>
        <h2 className="profile-subtitle">My Posts</h2>
        <div className="post-info">
          <div className="post-line">
            <span className="post-article number">1</span>
            <span className="post-article">just an article, it {Date()}</span>
            <span className="post-article" style={{ color: "green" }}>
              update
            </span>
            <span className="post-article" style={{ color: "red" }}>
              X
            </span>
          </div>
          <div className="post-line">
            <span className="post-article number">2</span>
            <span className="post-article">just an article, it {Date()}</span>
            <span className="post-article update">update</span>
            <span className="post-article">X</span>
          </div>
          <div className="post-line">
            <span className="post-article number">3</span>
            <span className="post-article">just an article, it {Date()}</span>
            <span className="post-article" style={{ color: "green" }}>
              update
            </span>
            <span className="post-article" style={{ color: "red" }}>
              X
            </span>
          </div>
        </div>
        <h2 className="profile-subtitle">Blog Activity</h2>
      </main>
    </div>
  );
}
