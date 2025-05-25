import React, { useState } from 'react'

export const ApplicationContext = React.createContext(null);
const ContextProvider = ({children}) => {
    
    // id of item will be key in cart and its count will be value
    // id of theme will be key and it will have either true or false.
    const [contextValue,setContextValue] = useState({
        "cartItems":{},
        "themes":{}
    });

    //shop item category
    const [category,setCategory] = useState(0);

    // payment 
    const [selectedPayment,setSelectedPayment] = useState("cod");

    const addToCart = (item)=>{
        if(item.id in contextValue.cartItems){
            setContextValue((prev)=> ({
            ...prev,
            cartItems:{
                ...prev.cartItems,  [item.id]:{ "numberOfItems": prev.cartItems[item.id]["numberOfItems"]+1, "priceOfItem":item.price,"imgUrl":item.imgUrl,"desc":item.desc,"name":item.name,"itemsInStock":item.itemsInStock }
            }
            })); 
        }
        else{
            setContextValue(prev => ({
                ...prev,cartItems:{
                    ...prev.cartItems,[item.id]:{"numberOfItems":1,"priceOfItem":item.price,"imgUrl":item.imgUrl,"desc":item.desc,"name":item.name,"itemsInStock":item.itemsInStock}
                }
            }))
        }
    }

    const removeFromCart = (item)=>{
       if(contextValue.cartItems[item.id]["numberOfItems"]>1){
        console.log("removing from cart inside if ");
        setContextValue(prev => ({
            ...prev,cartItems:{
                ...prev.cartItems, 
                [item.id]:{ "numberOfItems": prev.cartItems[item.id]["numberOfItems"]-1,"priceOfItem":item.price,"imgUrl":item.imgUrl,"desc":item.desc,"name":item.name,"itemsInStock":item.itemsInStock}
            }
        }))
       }
       else{
        console.log("removing from cart inside else ");
        setContextValue(prev=>{
            const updateCart = {...prev.cartItems};
            delete updateCart[item.id];
            return {
                ...prev,cartItems:updateCart
            }
        })
       }
    }

    const contextValues = {setContextValue,contextValue,addToCart,removeFromCart,category,setCategory,selectedPayment,setSelectedPayment};
  return (
    <div>
        <ApplicationContext.Provider value={contextValues}>
            {children}
        </ApplicationContext.Provider>
    </div>
  )
}

export default ContextProvider
