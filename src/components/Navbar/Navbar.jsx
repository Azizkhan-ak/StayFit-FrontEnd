import React, { useState,useEffect } from 'react'
import "./Navbar.css"
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

  const [selectedTab,selectTabValue] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("shop")) selectTabValue("shop");
    else if (path.includes("about")) selectTabValue("about");
    else if (path.includes("contact")) selectTabValue("contact");
    else if (path.includes("locations")) selectTabValue("locations");
    else if (path.includes("blogs")) selectTabValue("blogs");
    else selectTabValue("home");
  }, [location]);

  return (
    <div className="navbar">
      <div className='navbar-logo'>
        <img src='src/assets/Icon_Dumbell.png' />
      </div>
      <div className='navbar-menu-items'>
        <ul>
          <li><Link className={`nav-link ${selectedTab === 'home'?'active':''}`}  to="/"   >Home</Link></li>
          <li><Link className={`nav-link ${selectedTab === 'shop'?'active':''}`} to="/shop" >Shop</Link></li>
          <li><Link className={`nav-link ${selectedTab === 'about'?'active':''}`} to="/about" >About Us</Link></li>
          <li><Link className={`nav-link ${selectedTab === 'blogs'?'active':''}`} to="/blogs" >Blogs</Link></li>
          <li><Link className={`nav-link ${selectedTab === 'contact'?'active':''}`} to="/contact" >Contact Us</Link></li>
          <li><Link className={`nav-link ${selectedTab === 'locations'?'active':''}`} to="/locations" >Locations</Link></li>
          </ul>
      </div>
      <div className='navbar-controls'>
        <ul>
            <li>
                <img src ='src/assets/Icon_Search.png' title='Search'/>
            </li>
            <li>
                <img src ='src/assets/Icon_ShoppingCart.png' title='View your shopping cart'/>
            </li>
            <li>
                <img src ='src/assets/Icon_Account.png' title ='Login/Register '/>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
