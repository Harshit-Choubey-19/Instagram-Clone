import "./App.css";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Home from "./screens/Home.jsx";
import Profile from "./screens/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./screens/Createpost.jsx";
import { LoginContext } from "./context/LoginContext.jsx";
import Modal from "./components/Modal.jsx";
import UserProfile from "./components/UserProfile.jsx";
import MyFollowingPosts from "./screens/MyFollowingPosts.jsx";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="followingpost" element={<MyFollowingPosts />} />
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && (
            <Modal
              setUserLogin={setUserLogin}
              setModalOpen={setModalOpen}
            ></Modal>
          )}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
