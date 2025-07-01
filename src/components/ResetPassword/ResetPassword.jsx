import React, { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e)=>{
    setEmail(email.target.value);
  }

  const sendVerificaitonLink = ()=>{
    
  }

  return (
    <div>
      <div className="email-form-container">
        <form className="email-form">
          <div className="form-group">
            <label>Email:</label>
            <input required type="email" onChange={onchange} />
          </div>
          <button onClick={sendVerificaitonLink}  type="submit">Send verification link!</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
