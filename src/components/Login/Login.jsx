import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Button, Modal } from "bootstrap";
import { icons } from "../../assets/Asset";
import axios from "axios";
import { userManagementUrls } from "../../urls/urls";
import { ApplicationContext } from "../ContextProvider/ContextProvider";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "809742363195-7med73ik08h4cmsee308a1io8abtfur4.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  }, []);

  function handleGoogleResponse(response) {
    if (response && response.credential) {
      const sendToken = async () => {
        const apiResult = await axios.post(
          userManagementUrls.registerViaGoogle,
          response.credential,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );

        const responseData = apiResult.data;
        console.log(apiResult);
        if (responseData.successful === true) {
          const decodeToken = jwtDecode(responseData.content);
          sessionStorage.setItem("token", responseData.content);
          sessionStorage.setItem("subject", decodeToken.sub);
          sessionStorage.setItem("role", decodeToken.role);
          sessionStorage.setItem("expiry", decodeToken.exp);
          const model = new Modal(
            document.getElementById("loginSuccessModal"),
            {
              backdrop: "static",
              keyboard: false,
            }
          );
          model.show();
        } else {
          const model = new Modal(document.getElementById("loginFailedModal"), {
            backdrop: "static",
            keyboard: false,
          });
          model.show();
        }
      };

      sendToken();
    } else {
      const model = new Modal(document.getElementById("loginFailedModal"), {
        backdrop: "static",
        keyboard: false,
      });
      model.show();
    }
  }

  const { selectTabValue, selectedTab } = useContext(ApplicationContext);

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
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await axios.post(userManagementUrls.loginUrl, {
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 200) {
      const responseData = response.data;
      if (responseData.successful === true) {
        const decodeToken = jwtDecode(responseData.content);
        sessionStorage.setItem("token", responseData.content);
        sessionStorage.setItem("subject", decodeToken.sub);
        sessionStorage.setItem("role", decodeToken.role);
        sessionStorage.setItem("expiry", decodeToken.exp);
        const model = new Modal(document.getElementById("loginSuccessModal"), {
          backdrop: "static",
          keyboard: false,
        });
        model.show();
      } else {
        const model = new Modal(document.getElementById("loginFailedModal"), {
          backdrop: "static",
          keyboard: false,
        });
        model.show();
      }
    } else {
      const model = new Modal(document.getElementById("loginFailedModal"), {
        backdrop: "static",
        keyboard: false,
      });
      model.show();
    }
  };

  const register = async (e) => {
    e.preventDefault();

    const response = await axios.post(userManagementUrls.registerUrl, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      country: formData.country,
      address: formData.address,
    });
    console.log(response);
  };

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //create login success and failure models

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
                  <a href="/sendPasswordResetEmail">Forgot Password? Reset!</a>
                </div>
                <div className="login-button">
                  <button onClick={signIn}>
                    {loading ? "logging In..." : "Login"}
                  </button>
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

                  <div className="signup-button">
                    <button onClick={register}>
                      {loading ? "Singing Up..." : "Sign Up"}
                    </button>
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

      <div className="oauth-container">
        <div className="oauth">
          <h5>Or</h5>
          <div id="googleSignInDiv"></div>{" "}
          {/* Google will render button here */}
        </div>
      </div>

      {/* success model */}
      <div
        className="modal fade"
        id="loginSuccessModal"
        tabIndex="-1"
        aria-labelledby="loginSuccessModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginSuccessModalLabel">
                Logged In!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">You have logged in successfully!</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  selectTabValue("home");
                  window.location.replace("/"); // refresh state
                }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* failuer model */}
      <div
        className="modal fade"
        id="loginFailedModal"
        tabIndex="-1"
        aria-labelledby="loginFailedModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginFailedModalLabel">
                Log in failed!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Log in failed, invalid credentials!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  selectTabValue("home");
                  window.location.replace("/"); // refresh state
                }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
