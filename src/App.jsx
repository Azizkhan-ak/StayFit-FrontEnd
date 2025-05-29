import { useState } from 'react'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import ExploreServices from './components/ExploreServices/ExploreServices';
import { assets } from './assets/Asset.js';
import SupportFeatures from './components/SupportFeatures/SupportFeatures.jsx';
import Brands from './components/Brands/Brands.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Route, Router, Routes } from 'react-router-dom';
import About from './pages/About/About.jsx'
import Shop from './pages/Shop/Shop.jsx'
import Location from './pages/Location/Location.jsx';
import CartItems from './components/CartItems/CartItems.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your actual publishable key from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51RSKiUR1nSJNtSG2aRN44mtfQz1gLT7boRgeSoMZ3Z4nLWwB1jvZ1NBhVfXDBaajNlmSW29ByezLwbdCKKoHF3nG00ni7a7Qi8");


function GoToHome() {
  return (
    <>
      <Header />
      <ExploreServices items={assets.explore_items} />
      <SupportFeatures items={assets.support_features} />
      <Brands brands={assets.brands} />
      <Footer footer={assets.footer} />
    </>
  );
}

function App() {

  return (
    <>
    
      <Elements stripe={stripePromise}>
      <Navbar />
      <Routes>
        <Route path="/" element={<GoToHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/cartItems" element={<CartItems />} />
        {/* Add more routes as needed */}
      </Routes>
    </Elements>
    
    </>
  )
}

export default App
