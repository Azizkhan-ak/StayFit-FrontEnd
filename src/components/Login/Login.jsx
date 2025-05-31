import React, { useState } from "react";
import "./Login.css";
import { Button } from "bootstrap";
import { icons } from "../../assets/Asset";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    name: "",
    email: "",
    password: "",
    city: "",
    country: "",
    address: "",
  });
  const [signUp, setSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async ()=>{

  }

  const register = async ()=>{

  }

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="main-container">
        <div className="user-image">
          <img src={icons.login} />
        </div>
        <div>
          {!signUp ? (
            <div className="login-container">
              <form className="login-form">
                <div className="email-container">
                  <div className="email-label">
                    <label>Email</label>
                  </div>
                  <div className="email-input">
                    <input
                      id="email"
                      type="text"
                      placeholder="abc@gmail.com"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="password-container">
                  <div className="password-label">
                    <label>Password</label>
                  </div>
                  <div className="password-input">
                    <input
                      id="password"
                      type={`${showPassword ? "" : "password"}`}
                      placeholder="**********"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="showpassword">
                  <input
                    type="checkbox"
                    name="checkbox"
                    onChange={(e) => {
                      setShowPassword(!showPassword);
                    }}
                  />
                  <label>Show password</label>
                </div>
                <div className="login-button">
                  <button>Login</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="signup-container">
              <form className="signup-form">
                <div>
                  <div className="form-group">
                    <div className="first-name-label">
                      <label>First Name</label>
                    </div>
                    <div className="first-name-input">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Aziz"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="last-name-label">
                      <label>Last Name</label>
                    </div>
                    <div className="last-name-input">
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Ullah"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>Email</label>
                    </div>
                    <div>
                      <input
                        id="email"
                        type="text"
                        placeholder="xyz@gmail.com"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>Password</label>
                    </div>
                    <div>
                      <input
                        id="password"
                        type={`${showPassword ? "" : "password"}`}
                        placeholder="**********"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="showpassword">
                    <input
                      type="checkbox"
                      name="checkbox"
                      onChange={(e) => {
                        setShowPassword(!showPassword);
                      }}
                    />
                    <label>Show password</label>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>City</label>
                    </div>
                    <div>
                      <input
                        id="city"
                        type="text"
                        placeholder="Karcahi"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>Country</label>
                    </div>
                    <div>
                      <input
                        id="country"
                        type="text"
                        placeholder="Pakistan"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>Address</label>
                    </div>
                    <div>
                      <input
                        id="address"
                        type="text"
                        placeholder="House # XXX, Block # 08, Karachi."
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div>
                      <label>Phone</label>
                    </div>
                    <div>
                      <input
                        id="phone"
                        type="text"
                        placeholder="03XXXXXXXXXXXXX"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="login-button">
                    <button>Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div className="account-check">
            <p
              onClick={() => {
                setSignUp(!signUp);
              }}
            >
              {signUp
                ? "Already have account? Login "
                : "Do not have account? Signup "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
