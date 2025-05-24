import React from 'react'
import './Footer.css'

const Footer = ({footer}) => {
  return (
    <div className='footer'>
        <div className='footer-contact-us'>
            <p>Contact us</p>
            <ul>
                <li>
                    <img src={footer[0].locationIcon}/>
                </li>
                <li>
                    <p>Address: {footer[0].address}</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
