import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic({ changeProfile }) {
  const hiddenFileInput = useRef(null);

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // posting image to cloudinary
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "dl8pu9da7");
    fetch("https://api.cloudinary.com/v1_1/dl8pu9da7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  //saving pic to mongoDb
  const postPic = () => {
    fetch("/uploadProfilepic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeProfile();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ border: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={() => {
              handleClick();
            }}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div style={{ borderBottom: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            onClick={() => {
              setUrl(null);
              postPic();
            }}
            style={{ color: "#ED4956" }}
          >
            Remove Current Photo
          </button>
        </div>
        <div>
          <button
            className="can-btn"
            onClick={() => {
              changeProfile();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
