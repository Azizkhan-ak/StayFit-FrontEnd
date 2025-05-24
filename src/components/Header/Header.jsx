import React from 'react';
import Slider from 'react-slick';
import './Header.css';

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='header'>
      <Slider {...settings}>
        <div className='header_image'><img src="src/assets/header_image_01.jpg" /></div>
        <div className='header_image'><img src="src/assets/header_image_02.jpg" /></div>
        <div className='header_image'><img src="src/assets/header_image_03.jpg" /></div> 
        <div className='header_image'><img src="src/assets/header_image_04.jpg" /></div>
      </Slider>
    </div>
  );
};

export default Header;
