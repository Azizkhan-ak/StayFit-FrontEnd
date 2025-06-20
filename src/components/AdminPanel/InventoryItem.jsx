import React from 'react'
import './InventoryItem.css'

const InventoryItem = ({ item }) => {
  return (
   <div className="display-product">
        <div className="display-product-image">
          <img src={item.imgUrl} />
          </div>
          <div className="display-product-disc">
          <div className="display-prod-name">
            <h5>{item.name}</h5>
            <p>{item.desc}</p>
            <p>Items in Stock : {item.itemsInStock}</p>
            <p>Rs. {item.price.toLocaleString("en-PK")}/-</p>
          </div>
          </div>
      </div>
  )
}

export default InventoryItem
