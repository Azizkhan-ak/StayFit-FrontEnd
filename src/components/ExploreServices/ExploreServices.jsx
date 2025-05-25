import React, { useContext } from 'react'
import './ExploreServices.css'
import ExploreItem from './ExploreItem'
import { ApplicationContext } from '../ContextProvider/ContextProvider'
import { Link } from 'react-router-dom'

const ExploreServices = ({items}) => {

  const {category,setCategory} = useContext(ApplicationContext);

  return (
    <div className="explore-services">
      <ul>
        {items.map((item, index) => (
          <>
            <Link to="/shop">
              <li key={item.id} onClick={()=>{setCategory(item.id)}}>
                <ExploreItem item={item} index={index}/>
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}

export default ExploreServices
