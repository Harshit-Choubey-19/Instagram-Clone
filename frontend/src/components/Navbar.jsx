import React, { useContext } from "react";
import logo from "../image/logo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Navbar({ login }) {
  const navigate = useNavigate();

  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/followingpost">
            <li className="hov">My Following Post</li>
          </Link>
          <Link to="/createPost">
            <li className="hov">Create Post</li>
          </Link>
          <Link to="/profile">
            <li className="hov">Profile</li>
          </Link>
          <Link to="">
            <button
              className="prim-btn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Log out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li className="hov">SignUp</li>
          </Link>
          <Link to="/signin">
            <li className="hov">SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li className="hov">
              <span className="material-symbols-outlined">home</span>
            </li>
          </Link>

          <Link to="/followingpost">
            <li className="hov">
              <span className="material-symbols-outlined">explore</span>
            </li>
          </Link>
          <Link to="/createPost">
            <li className="hov">
              <span className="material-symbols-outlined">add_box</span>
            </li>
          </Link>
          <Link to="/profile">
            <li className="hov">
              <span className="material-symbols-outlined">account_circle</span>
            </li>
          </Link>

          <Link to="">
            <li
              className="hov"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <span className="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li className="hov">SignUp</li>
          </Link>
          <Link to="/signin">
            <li className="hov">SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img
        id="insta-logo"
        src={logo}
        alt=""
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      />

      <ul className="nav-menu">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
}

export default Navbar;
