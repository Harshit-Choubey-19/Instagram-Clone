import React from "react";
import "../css/PostDetails.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostDetails({ item, toggleDetails }) {
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    if (
      window.confirm(
        "Do you really want to Delete this post? It will permanently be deleted!"
      )
    ) {
      fetch(`/deletepost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toggleDetails();
          navigate("/");
          notifyB("Post Deleted!");
        });
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="post-pic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {/* card pic */}
            <div className="card-pic">
              <img
                src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                alt=""
              />
            </div>
            <h5>
              {item.postedBy.name} &nbsp;
              <span
                style={{
                  fontWeight: "400",
                  fontStyle: "italic",
                }}
              >
                @{item.postedBy.userName}
              </span>
            </h5>
            <div
              className="deletePost"
              onClick={() => {
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
          {/* comment section */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((cmt) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bold" }}>
                    @{cmt.postedBy.userName}{" "}
                  </span>
                  <span className="commentText">{cmt.comment}</span>
                </p>
              );
            })}
          </div>
          <div className="card-content">
            <p>
              {item.likes.length}{" "}
              {item.likes.length > 1 ? <span>Likes</span> : <span>Like</span>}
            </p>
            <p>{item.body}</p>
          </div>
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add comment"
              //   value={comment}
              //   onChange={(e) => {
              //     setComment(e.target.value);
              //   }}
            />
            <button
              className="comment-btn"
              //   onClick={() => {
              //     makeComment(comment, item._id);
              //     toggleComment();
              //   }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
}
