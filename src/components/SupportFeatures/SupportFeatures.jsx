import React from 'react'
import './SupportFeatures.css'

const SupportFeatures = ({items}) => {
  return (
    <div className='support-features'>
        <ul>
            {
            items.map( (item,index)=>(
                <li className='support-feature'>
                    <ul>
                        <li>
                        <img src={item.path} /> 
                        </li>
                        <li>
                            <div className='support-feature-msg'>
                            <p>{item.desc}</p>
                            <p>{item.msg}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            ) )
            
            }
        </ul>
    </div>
  )
}

export default SupportFeatures
