import React, { useContext } from "react";
import "./DisplayProduct.css";
import { icons } from "../../assets/Asset";
import { ApplicationContext } from "../../components/ContextProvider/ContextProvider";

const DisplayProduct = ({ item }) => {

  const {contextValue,addToCart,removeFromCart} = useContext(ApplicationContext);

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
        <div className="display-prod-add-remove">
          {
            contextValue.cartItems && contextValue.cartItems.hasOwnProperty(item.id) ? 
              (
               contextValue.cartItems[item.id]["numberOfItems"]==item.itemsInStock?
                <>
                <div> <img src={icons.minusIcon} onClick={()=>{removeFromCart(item)}} /></div>
                <div> <p>{contextValue.cartItems[item.id]["numberOfItems"]}</p></div> 
                </>
                :
                <>
                <div> <img src={icons.minusIcon} onClick={()=>{removeFromCart(item)}} /></div>
                <div> <p>{contextValue.cartItems[item.id]["numberOfItems"]}</p></div> 
                <div> <img src={icons.addIcon} onClick={()=>{addToCart(item)}} /></div>
                </>
                ) 
               :
              (
                <>
                <div> <img src={icons.addIcon} onClick={()=>{addToCart(item)}} /></div>
                </>
              )
             
          }
        </div>
        </div>
    </div>
  );
};

export default DisplayProduct;
