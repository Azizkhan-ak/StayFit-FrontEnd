import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { ApplicationContext } from "../ContextProvider/ContextProvider";

const Navbar = () => {
  const { contextValue,selectTabValue,selectedTab } = useContext(ApplicationContext);

  const location = useLocation();
  let totalItems = 0;

    if(contextValue.cartItems){
      totalItems = Object.values(contextValue.cartItems).reduce( (sum,item)=> sum+item["numberOfItems"],0);
    }

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("shop")) selectTabValue("shop");
    else if (path.includes("about")) selectTabValue("about");
    else if (path.includes("contact")) selectTabValue("contact");
    else if (path.includes("locations")) selectTabValue("locations");
    else if (path.includes("blogs")) selectTabValue("blogs");
    else if (path.includes("cartItems")) selectTabValue("cartItems");
    else if(path.includes("login")) selectTabValue("login");
    else selectTabValue("home");
  }, [location]);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/Icon_Dumbell.png" />
      </div>
      <div className="navbar-menu-items">
        <ul>
          <li>
            <Link
              className={`nav-link ${selectedTab === "home" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${selectedTab === "shop" ? "active" : ""}`}
              to="/shop"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${selectedTab === "about" ? "active" : ""}`}
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${selectedTab === "blogs" ? "active" : ""}`}
              to="/blogs"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                selectedTab === "contact" ? "active" : ""
              }`}
              to="/contact"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                selectedTab === "locations" ? "active" : ""
              }`}
              to="/locations"
            >
              Locations
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-controls">
        <ul>
          <li>
            <img src="src/assets/Icon_Search.png" title="Search" />
          </li>


          <li style={{ position: "relative" }}>
            <Link className={`icon ${
                selectedTab === "cartItems" ? "active" : ""
              }`} to="/cartItems" >
                <img
              src="src/assets/Icon_ShoppingCart.png"
              title="View your shopping cart"
              style={{ width: "40px", height: "40px" }}
            />
            {totalItems  > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                { totalItems }
              </span>
            )}
                </Link>  
          </li>
          <li>
            <Link className={`icon ${selectedTab === "login" ? "active":""}`} to={"/login"}>
            <img src="src/assets/Icon_Account.png" title="Login/Register " />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
