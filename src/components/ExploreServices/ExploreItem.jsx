import React from 'react'
import './ExploreItem.css'

const ExploreItem = ({item,index}) => {
  return (
    <div className='explore-item'>
      <div className='explore-item-image'>
        <img src={item.path}/>
      </div>
      <p>{item.desc}</p>
    </div>
  )
}

export default ExploreItem
