import React, { useState } from "react";
import "./SendPasswordResetEmail.css";
import { userManagementUrls } from "../../urls/urls";
import { Modal } from "bootstrap";
import axios from "axios";

const SendPasswordResetEmail = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const sendVerificaitonLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.get(userManagementUrls.passwordResetEmail + "?email=" + email);
    console.log(response);
    if (response && response.data && response.data.successful) {
      setLoading(false);
      const modal = new Modal(document.getElementById("resetSuccessModal"), {
        backdrop: "static",
        keyboard: false,
      });
      modal.show();
    } else {
      setLoading(false);
      const modal = new Modal(document.getElementById("resetErrorModal"), {
        backdrop: "static",
        keyboard: false,
      });
      modal.show();
    }
  };

  return (
    <div>
      <div className="send-email-pass-reset-email-form-container">
        <form className="send-email-pass-reset-email-form">
          <div className="send-email-pass-reset-form-group">
            <label>Email:</label>
            <input required type="email" onChange={onChange} />
          </div>
          <button onClick={sendVerificaitonLink} type="submit">
           {loading ? "please wait...." : "Send verification link!"} 
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <div
        className="modal fade"
        id="resetSuccessModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Email Sent</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              A password reset email has been sent to your address.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={()=>{
                  window.location.replace("/login");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <div
        className="modal fade"
        id="resetErrorModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Something went wrong. Please try again.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                 onClick={()=>{
                  window.location.replace("/login");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPasswordResetEmail;
