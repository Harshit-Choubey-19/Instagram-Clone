import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import PostDetails from "../components/PostDetails";
import ProfilePic from "../components/ProfilePic";

function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const [pics, setPics] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.post);
        setUser(result.user);
        console.log(result);
      });
  }, []);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              changeProfile();
            }}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
          <div className="pic-down-data">
            <p>{JSON.parse(localStorage.getItem("user")).name}&nbsp;|</p>
            <p>&nbsp;{JSON.parse(localStorage.getItem("user")).email}</p>
          </div>
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).userName}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>
              {pics ? pics.length : "0"} {pics?.length > 1 ? "Posts" : "Post"}
            </p>
            <p>
              {user.followers ? user.followers.length : "0"}{" "}
              {user?.followers?.length > 1 ? "Followers" : "Follower"}
            </p>
            <p>{user.following ? user.following.length : "0"} Following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {pics.map((pic) => {
          return (
            <img
              key={pic._id}
              src={pic.photo}
              className="item"
              onClick={() => {
                toggleDetails(pic);
              }}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </div>
      {show && <PostDetails item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}

export default Profile;
