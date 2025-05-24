import React from 'react'
import Slider from 'react-slick'
import './Brands.css'

const Brands = ({brands}) => {

    const sliderSettings = {
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,     // Number of items shown at once
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
    }
    

  return (
    <div className='brands'>
        <h1>Our Brands
        </h1>
        <div className='brands-slider'>
        <Slider {...sliderSettings}>
            {
                brands.map( (item,index)=>(
                    <div className='brand'>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                             <img src={item.path}/>
                        </a>
                    </div>
                ) )
            }
          </Slider>
        </div>
        
        </div>
  )
}

export default Brands
