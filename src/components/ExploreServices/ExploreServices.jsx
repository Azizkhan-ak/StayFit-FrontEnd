import React from 'react'
import './ExploreServices.css'
import ExploreItem from './ExploreItem'

const ExploreServices = ({items}) => {
  return (
    <div className='explore-services'>
        <ul>
           {
           items.map( (item,index)=>
            (
           <li key={item.id}>
                <ExploreItem item={item} index={index}/>
            </li>
           )
            )
           }
        </ul>
    </div>
  )
}

export default ExploreServices
