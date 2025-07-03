import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResetPassword.css";
import { userManagementUrls } from "../../urls/urls";
import axios from "axios";
import { Modal } from "bootstrap";

const ResetPassword = () => {

  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const resetPass = async (e) => {
    setLoading(true);
      e.preventDefault();
    const response = await axios.get(
      userManagementUrls.passwordReset +
        "?token=" +
        params.get("token") +
        "&password=" +
        password
    );
    
    if (response && response.data && response.data.successful) {
        setLoading(false);
        const modal = new Modal(document.getElementById("passwordResetSuccessModal"), {backdrop:"static",keyboard:false});
        modal.show();
    } else {
        setLoading(false);
        const modal = new Modal(document.getElementById("passwordResetErrorModal"), {backdrop:"static",keyboard:false});
        modal.show();
    }
  };

  return (
    <div>
      <div className="reset-pass-container">
        <form className="reset-pass-form-container">
          <div className="reset-pass-form-group">
            <label>Password:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              required
            />
          </div>
          <div className="reset-pass-form-group">
            <label>Confirm Password:</label>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="text"
              required
            />
          </div>
          <button
            disabled={password && password == confirmPassword ? false : true}
            onClick={resetPass}
          >
           {loading ? "reseting password....":"Reset!"} 
          </button>
        </form>
      </div>

      <div
        className="modal fade"
        id="passwordResetSuccessModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Your password has been reset successfully.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => window.location.replace("/login")}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="passwordResetErrorModal"
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
              Failed to reset your password. The link may be expired or invalid.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                 onClick={() => window.location.replace("/login")}
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

export default ResetPassword;
