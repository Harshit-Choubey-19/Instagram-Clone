import React, { useState, useEffect } from "react";
import "../css/UserProfile.css";
import PostDetails from "./PostDetails";
import { useParams } from "react-router-dom";

function UserProfile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
          <div className="pic-down-data">
            <p>{user.name}&nbsp;|</p>
            <p>&nbsp;{user.email}</p>
          </div>
        </div>
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.userName}</h1>
            <button
              className="follow-btn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>
              {posts ? posts.length : "0"}
              {posts?.length > 1 ? "Posts" : "Post"}
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
        {posts.map((pic) => {
          return (
            <img
              key={pic._id}
              src={pic.photo}
              className="item"
              //   onClick={() => {
              //     toggleDetails(pic);
              //   }}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </div>
      {/* {show && <PostDetails item={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
}

export default UserProfile;
