import React, { useState, useContext } from "react";
import "../css/Signin.css";
import logo from "../image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Signin() {
  const { setUserLogin } = useContext(LoginContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("invalid email!");
      return;
    }

    //sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  const continueWithGoogle = (credentialResponse) => {
    const jwtDetails = jwtDecode(credentialResponse.credential);
    console.log(jwtDetails);
    fetch("/googleLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetails.name,
        userName: jwtDetails.given_name,
        email: jwtDetails.email,
        email_verified: jwtDetails.email_verified,
        clientId: credentialResponse.clientId,
        Photo: jwtDetails.picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div className="signin">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={() => {
              postData();
            }}
            value="Sign In"
          />
          <p>or</p>
          <hr style={{ width: "80%" }} />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <div className="loginForm-2">
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}> SignUp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
