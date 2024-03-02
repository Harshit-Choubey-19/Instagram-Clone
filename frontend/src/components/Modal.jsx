import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal({ setModalOpen, setUserLogin }) {
  const navigate = useNavigate();
  return (
    <div
      className="darkBg"
      onClick={() => {
        setModalOpen(false);
      }}
    >
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button
            className="closeBtn"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <RiCloseLine></RiCloseLine>
          </button>
          {/* Modal content */}
          <div className="modalContent">Are you really want to Log out?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="cancelBtn"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  setUserLogin(false);
                  navigate("/signin");
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
